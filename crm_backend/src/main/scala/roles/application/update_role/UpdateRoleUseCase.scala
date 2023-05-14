package roles.application.update_role

import shared.application.BaseUseCase
import zio._
import roles.domain.repository.RoleRepository
import roles.domain.entity.Role

class UpdateRoleUseCase(roleId: Long)
(using roleRepository:RoleRepository)
    extends BaseUseCase[RequestUpdateRole, ResponseUpdateRole]:

  override def execute(request: RequestUpdateRole): Task[ResponseUpdateRole] =
    ZIO.succeed(
      ResponseUpdateRole(
        roleRepository.updateRole(
          Role(
            id = roleId,
            name = request.name,
            description = request.description
          )
        )
      )
    )
