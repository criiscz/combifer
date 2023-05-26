package roles.application.set_role_user

import shared.application.BaseUseCase
import zio._
import roles.domain.repository.UserRoleRepository
import roles.domain.entity.UserRole
import authentications.domain.repository.AuthenticationRepository

class SetRoleToUserUseCase
(using userRoleRepository:UserRoleRepository,
 authenticationRepository: AuthenticationRepository
)
extends BaseUseCase[RequestSetRoleToUser, ResponseSetRoleToUser]:

  override def execute(request: RequestSetRoleToUser): Task[ResponseSetRoleToUser] =
    ZIO.attempt {
      for
        user <- ZIO.fromOption(authenticationRepository.getUserByIdDocument(request.idDocument)).mapError(e => Throwable("Can't find User"))
        createdRole <- ZIO.succeed(userRoleRepository.insertUserRole(
          UserRole(
            roleId = request.roleId,
            userId = user._1.id
          )
        ))
      yield(ResponseSetRoleToUser(data = createdRole))
    }.flatten
