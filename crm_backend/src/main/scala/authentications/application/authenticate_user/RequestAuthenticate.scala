package authentications.application.authenticate_user

import authentications.domain.entity.AuthenticationToken

case class RequestAuthenticate(
  token: AuthenticationToken
)
