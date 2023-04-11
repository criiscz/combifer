package authentications.application.get_session_information

import authorizations.domain.entity._

case class ResponseGetSessionInformation (
  username: String,
  roles: List[Role],
  permissions: List[Permission], 
)
