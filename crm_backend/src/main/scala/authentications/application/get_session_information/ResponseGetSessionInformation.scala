package authentications.application.get_session_information

import authorizations.domain.entity._
import roles.domain.entity.Role

case class ResponseGetSessionInformation (
  username: String,
  roles: List[Role],
  permissions: List[Permission], 
)
