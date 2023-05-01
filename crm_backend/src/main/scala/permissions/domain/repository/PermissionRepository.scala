package permissions.domain.repository

import permissions.domain.entity.Permission

trait PermissionRepository:
  def getPermissions(from: Int, to: Int): List[Permission]
  def insertPermission(permission:Permission): Permission
  def updatePermission(permission:Permission): Permission
  def removePermission(id: Long): Permission
  def getTotalAmountOfPermissions(): Long
