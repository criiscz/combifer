package products.application.get_products

import shared.requests.PaginatedRequest

case class RequestGetProducts(
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
