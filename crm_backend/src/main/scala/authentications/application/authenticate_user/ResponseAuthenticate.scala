package authentications.application.authenticate_user

import authentications.domain.entity.UserContext
import authorizations.domain.entity.PermissionContext

case class ResponseAuthenticate(
  userContext: UserContext,
  permissionContext: PermissionContext
)
