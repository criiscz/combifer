package permissions.application.get_permissions

import permissions.domain.entity.Permission
import shared.responses._

sealed class ResponseGetPermissions (
  data: List[Permission],
  request: RequestGetPermissions,
  total: Long
) extends PaginatedResponse[Permission](
  data,
  Meta(
    currentPage = request.page,
    lastPage = request.page,
    from = request.page,
    to = request.page,
    total = total
  )
)
