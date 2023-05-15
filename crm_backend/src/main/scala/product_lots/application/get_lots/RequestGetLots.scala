package product_lots.application.get_lots

import shared.requests.PaginatedRequest

case class RequestGetLots (
  page: Int,
  perPage: Int,
  search: Option[String]
) extends PaginatedRequest(page, perPage)
