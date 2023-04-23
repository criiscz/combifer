package product_lots.application.get_lots

import shared.requests.PaginatedRequest

case class RequestGetLots (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)

