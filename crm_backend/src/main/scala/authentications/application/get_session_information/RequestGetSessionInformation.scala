package authentications.application.get_session_information

import authentications.domain.entity.UserContext
import authorizations.domain.entity.PermissionContext

case class RequestGetSessionInformation (
  user: UserContext,
  permission: PermissionContext
)
