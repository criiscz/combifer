package authentications.application.create_user

import authentications.domain.entity.User

case class ResponseCreateUser (
  user: User,
  agent: String
)
