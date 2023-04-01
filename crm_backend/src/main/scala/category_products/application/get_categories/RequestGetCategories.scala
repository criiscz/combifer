package category_products.application.get_categories

import shared.requests.PaginatedRequest

case class RequestGetCategories (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)

