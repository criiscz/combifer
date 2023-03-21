package authentications.infrastructure.repository

import authentications.domain.repository.AuthenticationRepository
import authentications.domain.entity.User

class AuthenticationRepositoryImpl extends AuthenticationRepository:

  override def getUserByUsername(username:String):Option[User] = 
    None

  override def createUser(user:User):User =
    null
