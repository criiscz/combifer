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

  override def getTotalAmountOfUsers(): Long =
    ctx.run(
      query[User].size
    )
  
  override def getUserByEmail(email:String):Option[User] =
    val q = quote {
      for 
        agent <- query[Agent].filter(_.email == lift(email))
        user <- query[User].join(_.agentId == agent.idDocument)
      yield (user)
    }
    ctx.run(q).headOption

  override def getUsers(from: Int, to: Int): List[(User, Agent)] =
    val q = quote {
      for
        user <- query[User]
          .sortBy(_.id)(Ord.ascNullsLast)
          .take(lift(to))
          .drop(lift(from))
        agent <- query[Agent]
          .join(_.idDocument == user.agentId)
      yield(user, agent)
    }
    ctx.run(q)

  override def getUserById(userId: Long):Option[(User,Agent)] =
    val q = quote {
      for
        user <- query[User].filter(_.id == lift(userId))
        agent <- query[Agent].join(_.idDocument == user.agentId)
      yield (user, agent)
    }
    ctx.run(q).headOption

  override def getUserByIdDocument(idDocument: Long):Option[(User, Agent)] =
    val q = quote {
      for
        agent <- query[Agent].filter(_.idDocument == lift(idDocument))
        user <- query[User].join(_.agentId == agent.idDocument)
      yield (user, agent)
    }
    ctx.run(q).headOption
