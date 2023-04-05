package locations.application.get_locations

import shared.requests.PaginatedRequest

case class RequestGetLocations(
  page: Int,
  perPage: Int
) extends PaginatedRequest(page, perPage)
