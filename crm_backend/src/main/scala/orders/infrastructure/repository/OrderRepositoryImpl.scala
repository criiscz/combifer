package orders.infrastructure.repository

import orders.domain.repository.OrderRepository
import orders.domain.entity.Order
import shared.BaseRepository

import io.getquill._
import order_products.domain.entity.OrderProduct
import agents.domain.entity.Agent

class OrderRepositoryImpl extends OrderRepository with BaseRepository:

  import ctx._

  override def getOrder(orderId:Long): Option[(Order, Agent)] =
    val q = quote {
      for {
        order <- query[Order].filter(_.id == lift(orderId))
        employee <- query[Agent].filter(_.idDocument == order.employeeId)
      } yield (order, employee)
    }
    ctx.run(q).headOption

  override def getOrders(from: Int, to: Int): List[Order] =
    ctx.run(
      query[Order]
        .sortBy(_.id)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
    )

  override def getOrdersCreatedByEmployee(employeeId: Long, from: Int, to: Int): List[Order] = 
    ctx.run(
      query[Order]
        .filter(_.employeeId == lift(employeeId))
        .sortBy(_.id)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
    )

  override def insertOrder(order:Order): Order = 
    ctx.run(
      query[Order]
        .insertValue(lift(order))
        .returning(r => r)
    )

  override def updateOrder(order:Order): Order = 
    ctx.run(
      query[Order]
        .filter(_.id == lift(order.id))
        .updateValue(lift(order))
        .returning(r => r)
    )
