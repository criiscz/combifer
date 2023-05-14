package roles.application.get_role

import shared.application.BaseUseCase
import zio.Task
import zio.ZIO
import roles.domain.repository.RoleRepository

class GetRoleUseCase
(using roleRepository:RoleRepository)
extends BaseUseCase[RequestGetRole, ResponseGetRole]:

    override def execute(request: RequestGetRole) =
        roleRepository.getRole(request.roleId) match
            case None => ZIO.fail(new Throwable("Can't find Role!"))
            case Some(value) => ZIO.succeed(ResponseGetRole(data = value))
