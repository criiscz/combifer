package authentications.infrastructure.repository

import authentications.domain.repository.AuthenticationRepository
import authentications.domain.entity.User
import shared.BaseRepository
import io.getquill._

class AuthenticationRepositoryImpl extends AuthenticationRepository with BaseRepository:

  import ctx._

  override def getUserByUsername(username:String):Option[User] = 
    ctx.run(
      query[User]
      .filter(_.username == lift(username))
    ).headOption


  override def createUser(user:User):User =
    ctx.run(
      query[User]
        .insertValue(lift(user))
        .returning(r => r)
    )
