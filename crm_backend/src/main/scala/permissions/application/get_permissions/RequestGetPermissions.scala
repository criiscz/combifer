package permissions.application.get_permissions

import shared.requests.PaginatedRequest

case class RequestGetPermissions (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
