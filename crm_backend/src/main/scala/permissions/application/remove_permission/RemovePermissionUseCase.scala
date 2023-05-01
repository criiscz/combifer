package permissions.application.remove_permission

import shared.application.BaseUseCase
import zio._
import permissions.domain.repository.PermissionRepository

class RemovePermissionUseCase
(using permissionRepository: PermissionRepository)
    extends BaseUseCase[RequestRemovePermission, ResponseRemovePermission]:

  override def execute(request: RequestRemovePermission): Task[ResponseRemovePermission] =
    ZIO.succeed {
      ResponseRemovePermission(
        permissionRepository.removePermission(request.id)
      )
    }
