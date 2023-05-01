package roles.application.get_roles

import roles.domain.entity.Role
import shared.responses._

sealed class ResponseGetRoles (
  data: List[Role],
  request: RequestGetRoles,
  total: Long
) extends PaginatedResponse[Role](
  data,
  Meta(
    currentPage = request.page,
    lastPage = request.page,
    from = request.page,
    to = request.page,
    total = total
  )
)
