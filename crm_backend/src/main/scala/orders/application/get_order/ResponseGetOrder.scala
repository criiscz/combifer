package orders.application.get_order

import orders.domain.entity.Order
import agents.domain.entity.Agent
import order_products.domain.entity.OrderProduct

case class ResponseGetOrder(
  order: Order,
  employee: Agent,
  products: List[OrderProduct]
)
