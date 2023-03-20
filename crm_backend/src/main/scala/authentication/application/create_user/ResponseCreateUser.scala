package authentication.application.create_user

import authentication.domain.entity.User

case class ResponseCreateUser (
  user: User,
  agent: String
)
