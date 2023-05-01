package roles.domain.repository

import roles.domain.entity.Role

trait RoleRepository:
    def getRole(id: Long): Option[Role]
    def getRoles(from: Int, to:Int): List[Role]
    def insertRole(role: Role): Role
    def updateRole(role: Role): Role
    def removeRole(id: Long): Role
    def getTotalAmountOfRoles(): Long
