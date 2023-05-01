package permissions.application.get_permissions

import shared.application.BaseUseCase
import zio._
import permissions.domain.repository.PermissionRepository

class GetPermissionsUseCase
(using permissionRepository: PermissionRepository)
    extends BaseUseCase[RequestGetPermissions, ResponseGetPermissions]:

  override def execute(request: RequestGetPermissions): Task[ResponseGetPermissions] =
    for
      permissions <- ZIO.succeed(permissionRepository.getPermissions(request.from, request.to))
      total <- ZIO.succeed(permissionRepository.getTotalAmountOfPermissions())
    yield(
      ResponseGetPermissions(
        permissions,
        request,
        total)
    )
