package locations.application.get_locations

import locations.domain.entity.Location
import shared.responses._

sealed class ResponseGetLocations(
  data:List[Location],
  request: RequestGetLocations,
  total: Long
) extends PaginatedResponse[Location](
  data,
  Meta(
    currentPage = request.page,
    lastPage = request.page,
    from = request.page,
    to = request.page,
    total = total
  )
)
