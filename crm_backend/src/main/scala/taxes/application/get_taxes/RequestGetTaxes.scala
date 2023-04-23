package taxes.application.get_taxes

import shared.requests.PaginatedRequest

case class RequestGetTaxes (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
