package authentications.application.create_user

import authentications.domain.entity.User
import agents.domain.entity.Agent

case class ResponseCreateUser (
  username: String,
  document: Long, 
  email:String,
  status: String = "User created successfully"
)
