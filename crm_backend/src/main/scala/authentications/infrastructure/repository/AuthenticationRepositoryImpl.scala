package authentications.infrastructure.repository

import authentications.domain.repository.AuthenticationRepository
import authentications.domain.entity.User
import agents.domain.entity.Agent
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

  
  override def getUserByEmail(email:String):Option[User] =
    val q = quote {
      for 
        agent <- query[Agent].filter(_.email == lift(email))
        user <- query[User].join(_.agentId == agent.idDocument)
      yield (user)
    }
    ctx.run(q).headOption
