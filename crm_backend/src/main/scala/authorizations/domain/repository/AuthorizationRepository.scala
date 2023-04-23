package authorizations.domain.repository

import authorizations.domain.entity.PermissionContext
import authorizations.domain.entity.Role

trait AuthorizationRepository:
  def getPermissionContextOfUser(userId: Long): PermissionContext 
  def getRolesOfUser(userId:Long): List[Role]
