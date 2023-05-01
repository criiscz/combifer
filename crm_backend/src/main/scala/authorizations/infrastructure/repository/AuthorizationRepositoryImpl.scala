package authorizations.infrastructure.repository

import zio._
import scala.quoted.Quotes
import io.getquill._

import authorizations.domain.repository._
import authorizations.domain.entity.PermissionContext
import shared.BaseRepository
import authorizations.domain.entity._
import roles.domain.entity._

class AuthorizationRepositoryImpl extends AuthorizationRepository with BaseRepository:

  import ctx._

  override def getPermissionContextOfUser(userId: Long): PermissionContext =
    PermissionContext(permissions = List())

  override def getRolesOfUser(userId:Long): List[Role] = 
    val q = quote {
      for 
        userRoles <- query[UserRole].filter(_.userId == lift(userId))
        roles <- query[Role].join(_.id == userRoles.roleId)
      yield (roles)
    }
    ctx.run(q)
