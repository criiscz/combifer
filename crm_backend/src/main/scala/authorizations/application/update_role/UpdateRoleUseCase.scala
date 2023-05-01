package authorizations.application.update_role

import shared.application.BaseUseCase
import zio._
import authorizations.domain.repository.RoleRepository
import authorizations.domain.entity.Role

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
