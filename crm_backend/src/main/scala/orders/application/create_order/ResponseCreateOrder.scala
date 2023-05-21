package orders.application.create_order

import orders.domain.entity.Order
import order_products.domain.entity.OrderProduct

case class ResponseCreateOrder (
  data: Order,
  products: List[OrderProduct]
)
