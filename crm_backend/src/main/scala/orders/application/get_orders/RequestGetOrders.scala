package orders.application.get_orders

import shared.requests.PaginatedRequest

case class RequestGetOrders (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
