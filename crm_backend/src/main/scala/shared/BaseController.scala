package shared

import sttp.model.HeaderNames
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import io.circe.generic.auto._
import sttp.tapir.generic.auto._

import authentications.domain.error._
import authentications.domain.entity._
import authentications.application.authenticate_user._
import authentications.domain.service.JwtService

class BaseController()(using jwtService: JwtService):

  private val authUseCase = AuthenticateUserUseCase()

  val secureEndpoint: ZPartialServerEndpoint[Any, AuthenticationToken, UserContext, Unit, AuthenticationError, Unit, Any] =
    endpoint
      .securityIn(auth.bearer[String]().mapTo[AuthenticationToken])
      .errorOut(jsonBody[AuthenticationError])
      .zServerSecurityLogic(authUseCase.authenticate)
