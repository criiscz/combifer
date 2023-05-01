package roles.application.remove_role

import shared.application.BaseUseCase
import zio._
import roles.domain.repository.RoleRepository

class RemoveRoleUseCase
(using roleRepository:RoleRepository)
    extends BaseUseCase[RequestRemoveRole, ResponseRemoveRole]:
    override def execute(request: RequestRemoveRole): Task[ResponseRemoveRole] =
      ZIO.succeed {
        ResponseRemoveRole(
          data = roleRepository.removeRole(request.roleId)
        )
      }
