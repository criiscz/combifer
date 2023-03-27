package authorizations.domain.repository

import authorizations.domain.entity.PermissionContext

trait AuthorizationRepository:
  def getPermissionContextOfUser(userId: Long): PermissionContext 
