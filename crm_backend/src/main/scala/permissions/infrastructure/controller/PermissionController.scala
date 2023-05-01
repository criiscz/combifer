package permissions.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import shared.BaseController
import permissions.domain.repository.PermissionRepository
import authentications.domain.service.JwtService
import shared.responses._
import permissions.domain.entity.Permission
import shared.mapper.endpoints.Exposer._
import authentications.domain.entity.UserContext
import authorizations.domain.entity.PermissionContext

import permissions.application.get_permissions._
import permissions.application.remove_permission._
import permissions.application.create_permission._
import permissions.application.update_permission._

class PermissionController
(using
   permissionRepository: PermissionRepository,
   jwtService: JwtService)
extends BaseController:

  private val routeName = "permissions"

  private val getPermissions =
    secureEndpoint
    .in(routeName)
    .get
    .in(
      query[Int]("page").and(query[Int]("per_page"))
    )
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[PaginatedResponse[Permission]])
    .exposeSecure

  private val getPermissionsRoute =
    getPermissions.serverLogic { (user:UserContext, permission:PermissionContext) => (page: Int, perPage: Int) =>
      GetPermissionsUseCase()
        .execute(RequestGetPermissions(page, perPage))
        .mapError(e => ErrorResponse(message = "Can't get Permissions"))
    }.expose

  private val removePermission =
    secureEndpoint
    .in(routeName / path[Long]("id"))
    .delete
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseRemovePermission])
    .exposeSecure

  private val removePermissionRoute =
    removePermission.serverLogic { (user:UserContext, permission:PermissionContext) => (id: Long) =>
      RemovePermissionUseCase().execute(
        RequestRemovePermission(id)
      )
      .mapError(e =>
        ErrorResponse(
          message = "Can't delete permission", detail = Some(e.getMessage())
        )
      )
    }.expose

  private val createPermission =
    secureEndpoint
    .in(routeName)
    .in(jsonBody[RequestCreatePermission])
    .post
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseCreatePermission])
    .exposeSecure

  private val createPermissionRoute =
    createPermission.serverLogic { (user:UserContext, permission: PermissionContext) => request =>
      CreatePermissionUseCase().execute(
        request
      )
      .mapError(e =>
        ErrorResponse(
          message = "Can't create permission", detail = Some(e.getMessage())
        )
      )
    }.expose

  private val updatePermission =
    secureEndpoint
    .in(routeName / path[Long]("id"))
    .put
    .in(jsonBody[RequestUpdatePermission])
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseUpdatePermission])
    .exposeSecure

  private val updatePermissionRoute =
    updatePermission.serverLogic{ (user:UserContext, permission: PermissionContext) => (id:Long, request:RequestUpdatePermission) =>
      UpdatePermissionUseCase(id).execute(
        request
      )
      .mapError(e =>
        ErrorResponse(message = "Can't update Permission", detail = Some(e.getMessage()))
      )
    }.expose
