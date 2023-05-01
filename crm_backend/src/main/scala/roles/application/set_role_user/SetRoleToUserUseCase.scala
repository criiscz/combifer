package roles.application.set_role_user

import shared.application.BaseUseCase
import zio._
import roles.domain.repository.UserRoleRepository
import roles.domain.entity.UserRole

class SetRoleToUserUseCase
(using userRoleRepository:UserRoleRepository)
extends BaseUseCase[RequestSetRoleToUser, ResponseSetRoleToUser]:

  override def execute(request: RequestSetRoleToUser): Task[ResponseSetRoleToUser] =
    ZIO.succeed {
      val createdRole = userRoleRepository.insertUserRole(
        UserRole(
          roleId = request.roleId,
          userId = request.userId
        )
      )
      ResponseSetRoleToUser(data = createdRole)
    }
