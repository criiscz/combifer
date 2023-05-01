package roles.application.create_role

import shared.application.BaseUseCase
import zio._
import roles.domain.entity.Role
import roles.domain.repository.RoleRepository

class CreateRoleUseCase
(using roleRepository:RoleRepository)
extends BaseUseCase[RequestCreateRole, ResponseCreateRole]:

  override def execute(request: RequestCreateRole): Task[ResponseCreateRole] =
    ZIO.succeed{
      val createdRole = roleRepository.insertRole(
        Role(
          name = request.name,
          description = request.description
        )
      )
      ResponseCreateRole(data = createdRole)
    }
