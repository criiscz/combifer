package authentications.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import authentications.application.login_user._
import authentications.application.create_user._
import authentications.application.get_session_information._
import authentications.application.get_users._

import shared.responses.ErrorResponse
import shared.mapper.endpoints.Exposer._
import authentications.domain.service.JwtService
import sttp.tapir.EndpointIO.annotations.endpointInput
import authentications.domain.repository.AuthenticationRepository
import agents.domain.repository.AgentRepository
import authentications.domain.service.HashService
import authorizations.domain.repository.AuthorizationRepository
import shared.BaseController
import shared.responses._
import authorizations.domain.entity.PermissionContext
import authentications.domain.entity.UserContext
import authentications.domain.entity.User

class AuthenticationController()
(using 
  jwtService: JwtService, 
  hashService: HashService,
  authenticationRepository: AuthenticationRepository, 
  authorizationRepository: AuthorizationRepository,
  agentRepository: AgentRepository,
)extends BaseController:

  private val loginUser:PublicEndpoint[RequestLoginUser, ErrorResponse,ResponseLoginUser, Any] =
    endpoint
    .in("login")
    .in(jsonBody[RequestLoginUser])
    .post
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseLoginUser])
    .expose

  private val loginUserRoute: ZServerEndpoint[Any, Any] = loginUser.zServerLogic { request =>
    LoginUserUseCase()
      .execute(request) 
      .mapError(e => ErrorResponse(message="Can't Login"))
  }.expose

  private val createUser: PublicEndpoint[RequestCreateUser, ErrorResponse, ResponseCreateUser, Any] =
    endpoint
      .in("signup")
      .in(jsonBody[RequestCreateUser])
      .post
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseCreateUser])
      .expose

  private val createUserRoute:ZServerEndpoint[Any, Any] = createUser.zServerLogic { request => 
      CreateUserUseCase()
        .execute(request) 
        .mapError(e => ErrorResponse(message="Can't create user"))
  }.expose

  private val getSessionInformation = 
    secureEndpoint
    .in("session-info")
    .get
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseGetSessionInformation])
    .exposeSecure

  private val getSessionInformationRoute:ZServerEndpoint[Any, Any] = 
    getSessionInformation.serverLogic{ (user:UserContext, permission:PermissionContext) => _ =>
      GetSessionInformationUseCase().execute(
        RequestGetSessionInformation(user, permission) 
      )
      .mapError(e => ErrorResponse(message="Can't get current session information"))
    }.expose

  private val getUsers =
    secureEndpoint
    .in("users")
    .get
    .in(
      query[Int]("page").and(query[Int]("per_page"))
    )
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[PaginatedResponse[UserAgentInformation]])
    .exposeSecure

  private val getUsersRoute=
    getUsers.serverLogic { (user:UserContext, permission:PermissionContext) => (page: Int, perPage: Int) =>
      GetUsersUseCase().execute(
        RequestGetUsers(page, perPage)
      ).mapError(e => ErrorResponse(message = "Can't get Roles"))
    }.expose
