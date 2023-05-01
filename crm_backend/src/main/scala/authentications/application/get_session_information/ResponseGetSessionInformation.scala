package authentications.application.get_session_information

import roles.domain.entity.Role
import permissions.domain.entity.Permission

case class ResponseGetSessionInformation (
  name: String,
  lastname: String,
  username: String,
  roles: List[Role],
  permissions: List[Permission], 
)
