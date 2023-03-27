package authentications.domain.entity

import authorizations.domain.entity.PermissionContext

case class TokenInfo(
  userContext: UserContext,
  permissionContext: PermissionContext
)
