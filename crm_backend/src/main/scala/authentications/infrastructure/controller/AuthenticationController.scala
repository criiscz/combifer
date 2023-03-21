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

import shared.responses.ErrorResponse
import shared.mapper.endpoints.Exposer._
import authentications.domain.service.JwtService
import sttp.tapir.EndpointIO.annotations.endpointInput
import authentications.domain.repository.AuthenticationRepository

class AuthenticationController()(using jwtService: JwtService, authenticationRepository: AuthenticationRepository):

  private val loginUser:PublicEndpoint[RequestLoginUser, ErrorResponse,ResponseLoginUser, Any] =
    endpoint
    .in("login")
    .in(jsonBody[RequestLoginUser])
    .post
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseLoginUser])
    .expose

  private val loginUserRoute: ZServerEndpoint[Any, Any] = loginUser.zServerLogic { request =>
    LoginUserUseCase().execute(request) match 
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message = "Failed Login"))
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
      CreateUserUseCase().execute(request) match
        case Some(value) => ZIO.succeed(value)
        case None => ZIO.fail(ErrorResponse(message = "Failed User Created"))
  }.expose
