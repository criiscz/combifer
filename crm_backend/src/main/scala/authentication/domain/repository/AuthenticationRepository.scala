package authentication.domain.repository

import authentication.domain.entity.User

trait AuthenticationRepository:
  def getUserByUsername(username:String):Option[User]
  def createUser(user:User):User
