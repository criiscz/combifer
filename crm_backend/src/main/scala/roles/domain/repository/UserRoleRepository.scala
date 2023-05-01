package roles.domain.repository

import roles.domain.entity.UserRole

trait UserRoleRepository:
  def insertUserRole(userRole: UserRole): UserRole
