package sales.application.get_sales

import shared.requests.PaginatedRequest

case class RequestGetSales (
  page:Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
