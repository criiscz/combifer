package roles.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import shared.BaseController
import shared.responses._
import roles.domain.repository._
import shared.mapper.endpoints.Exposer._
import authentications.domain.service.JwtService
import authentications.domain.entity.UserContext
import authorizations.domain.entity.PermissionContext
import authentications.domain.repository.AuthenticationRepository
import roles.domain.entity.Role

import roles.application.get_role._
import roles.application.get_roles._
import roles.application.remove_role._
import roles.application.create_role._
import roles.application.update_role._
import roles.application.set_role_user._

class RoleController
(using
   roleRepository:RoleRepository,
   userRoleRepository: UserRoleRepository,
   authenticationRepository: AuthenticationRepository,
   jwtService: JwtService)
extends BaseController:

  private val routeName = "roles"

  private val getRole =
    secureEndpoint
    .in(routeName  / path[Long]("id"))
    .get
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseGetRole])
    .exposeSecure

  private val getRoleRoute =
    getRole.serverLogic { (user:UserContext, permission:PermissionContext) => (id: Long) =>
      GetRoleUseCase().execute(
        RequestGetRole(id)
      ).mapError(e => ErrorResponse(message = "Can't find Role"))
    }.expose

  private val getRoles =
    secureEndpoint
    .in(routeName)
    .get
    .in(
      query[Int]("page").and(query[Int]("per_page"))
    )
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[PaginatedResponse[Role]])
    .exposeSecure

  private val getRolesRoute =
    getRoles.serverLogic { (user:UserContext, permission:PermissionContext) => (page: Int, perPage: Int) =>
      GetRolesUseCase().execute(
        RequestGetRoles(page, perPage)
      )
      .mapError(e => ErrorResponse(message = "Can't get Roles"))
    }.expose

  private val removeRole =
    secureEndpoint
    .in(routeName / path[Long]("id"))
    .delete
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseRemoveRole])
    .exposeSecure

  private val removeRoleRoute =
    removeRole.serverLogic { (user:UserContext, permission:PermissionContext) => (id: Long) =>
      RemoveRoleUseCase().execute(
        RequestRemoveRole(id)
      )
      .mapError(e => ErrorResponse(message = "Can't delete the role"))
    }.expose

  private val createRole =
    secureEndpoint
    .in(routeName)
    .in(jsonBody[RequestCreateRole])
    .post
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseCreateRole])
    .exposeSecure

  private val createRoleRoute =
    createRole.serverLogic { (user:UserContext, permission: PermissionContext) => request =>
      CreateRoleUseCase().execute(
        request
      )
      .mapError(e => ErrorResponse(message = "Can't createthe role"))
    }

  private val updateRole =
    secureEndpoint
    .in(routeName / path[Long]("id"))
    .put
    .in(jsonBody[RequestUpdateRole])
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseUpdateRole])
    .exposeSecure

  private val updateRoleRoute =
    updateRole.serverLogic{ (user:UserContext, permission: PermissionContext) => (id:Long, request:RequestUpdateRole) =>
      UpdateRoleUseCase(id).execute(
        request
      )
      .mapError(e => ErrorResponse(message = "Can't update Role"))
    }.expose

  private val setRoleToUser =
    secureEndpoint
    .in(routeName / path[Long]("role_id") / "set-to" / path[Long]("id_document"))
    .post
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseSetRoleToUser])
    .exposeSecure

  private val setRoleToUserRoute =
    setRoleToUser.serverLogic{ (user:UserContext, permission: PermissionContext) => (roleId:Long, idDocument:Long) =>
      SetRoleToUserUseCase().execute(
        RequestSetRoleToUser(roleId, idDocument)
      )
      .mapError(e => ErrorResponse(message = "Can't set role to user"))
    }.expose
