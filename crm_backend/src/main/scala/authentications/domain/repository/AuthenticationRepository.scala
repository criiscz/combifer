package authentications.domain.repository

import authentications.domain.entity.User

trait AuthenticationRepository:
  def getUserByUsername(username:String):Option[User]
  def getUserByEmail(email:String):Option[User]
  def createUser(user:User):User
