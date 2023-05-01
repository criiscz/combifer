package authorizations.domain.entity

import permissions.domain.entity.Permission

case class PermissionContext(
  permissions: List[Permission]
)
