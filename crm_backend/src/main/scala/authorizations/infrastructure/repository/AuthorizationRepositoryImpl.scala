package authorizations.infrastructure.repository

import authorizations.domain.repository._
import authorizations.domain.entity.PermissionContext
import shared.BaseRepository

class AuthorizationRepositoryImpl extends AuthorizationRepository with BaseRepository:

  def getPermissionContextOfUser(userId: Long): PermissionContext =
    PermissionContext(permissions = List())
