package agents.application.get_clients

import shared.requests.PaginatedRequest

case class RequestGetClients (
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
