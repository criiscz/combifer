package order_products.infrastrucuture.repository

import zio._
import scala.quoted.Quotes
import io.getquill._

import order_products.domain.repository.OrderProductRepository
import shared.BaseRepository
import order_products.domain.entity.OrderProduct

class OrderProductRepositoryImpl extends OrderProductRepository with BaseRepository:

  import ctx._

  override def getProductsOfOrderId(orderId:Long):List[OrderProduct] =
    ctx.run(
      query[OrderProduct].filter(_.orderId == lift(orderId))
    )

  override def insertOrderProduct(orderProduct: OrderProduct): OrderProduct =  
    ctx.run(
      query[OrderProduct]
        .insertValue(lift(orderProduct))
        .returning(r => r)
    )

  override def updateOrderProduct(orderProduct: OrderProduct): OrderProduct =
    ctx.run(
      query[OrderProduct]
        .filter(_.id == lift(orderProduct.id))
        .updateValue(lift(orderProduct))
        .returning(r => r)
    )
