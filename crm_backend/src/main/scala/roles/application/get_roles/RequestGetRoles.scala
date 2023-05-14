package roles.application.get_roles

import shared.requests.PaginatedRequest

case class RequestGetRoles (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
