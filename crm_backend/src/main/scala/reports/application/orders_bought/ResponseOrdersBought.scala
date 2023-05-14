package reports.application.orders_bought

import order_products.domain.entity.OrderProduct

case class ResponseOrdersBought (
  data: List[OrderProduct]
)
