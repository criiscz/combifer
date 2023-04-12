package order_products.domain.repository

import order_products.domain.entity.OrderProduct

trait OrderProductRepository:
  def getProductsOfOrderId(orderId:Int):List[OrderProduct]
  def insertOrderProduct(orderProduct: OrderProduct): OrderProduct
  def updateOrderProduct(orderProduct: OrderProduct): OrderProduct
