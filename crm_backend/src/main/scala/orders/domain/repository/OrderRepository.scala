package orders.domain.repository

import orders.domain.entity.Order
import order_products.domain.entity.OrderProduct
import agents.domain.entity.Agent

trait OrderRepository:
  def getOrder(orderId:Long):Option[(Order, Agent)]
  def getOrders(from: Int, to:Int): List[Order]
  def getOrdersCreatedByEmployee(employeeId: Long, from: Int = 0, to:Int = Int.MaxValue): List[Order]
  def getTotalAmountOfOrders(): Long
  def insertOrder(order:Order): Order
  def updateOrder(order:Order): Order
