package authentication.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import authentication.application.login_user._
import shared.responses.ErrorResponse
import shared.mapper.endpoints.Exposer._
import authentication.domain.service.JwtService

class AuthenticationController()(using jwtService: JwtService):

  private val loginUser:PublicEndpoint[RequestLoginUser, ErrorResponse,ResponseLoginUser, Any] =
    endpoint
    .in("login")
    .in(jsonBody[RequestLoginUser])
    .post
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseLoginUser])
    .expose

  private val loginUserRoute: ZServerEndpoint[Any, Any] = loginUser.zServerLogic { request =>
    LoginUserUseCase().execute(request) match {
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message="Failed Login"))
    }
  }.expose
