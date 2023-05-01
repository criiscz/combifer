package roles.application.get_roles

import shared.application.BaseUseCase
import zio._
import roles.domain.repository.RoleRepository

class GetRolesUseCase
(using roleRepository:RoleRepository)
    extends BaseUseCase[RequestGetRoles, ResponseGetRoles]:

  override def execute(request: RequestGetRoles): Task[ResponseGetRoles] =
    for
        roles <- ZIO.succeed(roleRepository.getRoles(request.from, request.to))
        total <- ZIO.succeed(roleRepository.getTotalAmountOfRoles())
    yield (
      ResponseGetRoles(
           data = roles,
           request = request,
           total = total
      )
    )
