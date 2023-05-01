package authorizations.domain.repository

import authorizations.domain.entity.Role

trait RoleRepository:
    def getRole(roleId: Long): Option[Role]
    def getRoles(from: Int, to:Int): List[Role]
    def insertRole(role: Role): Role
    def updateRole(role: Role): Role
    def removeRole(id: Long): Role
    def getTotalAmountOfRoles(): Long
