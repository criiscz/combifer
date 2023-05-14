package permissions.application.update_permission

import shared.application.BaseUseCase
import permissions.domain.repository.PermissionRepository
import zio._
import permissions.domain.entity.Permission

class UpdatePermissionUseCase(permissionId: Long)
(using permissionRepository: PermissionRepository)
    extends BaseUseCase[RequestUpdatePermission, ResponseUpdatePermission]:

  override def execute(request: RequestUpdatePermission): Task[ResponseUpdatePermission] =
    ZIO.succeed {
      val updated = permissionRepository.updatePermission(
        Permission(
          id = permissionId,
          name = request.name,
          accessModule = request.accessModule,
          roleId = request.roleId
        )
      )
      ResponseUpdatePermission(updated)
    }
