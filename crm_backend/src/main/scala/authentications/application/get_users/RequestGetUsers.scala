package authentications.application.get_users

import shared.requests.PaginatedRequest

case class RequestGetUsers (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
