package shared

import zio._
import scala.util._
import sttp.model.HeaderNames
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import io.circe.generic.auto._
import sttp.tapir.generic.auto._

import authentications.domain.error._
import authentications.domain.entity._
import authentications.application.authenticate_user._
import authorizations.domain.entity._
import authentications.domain.service.JwtService

class BaseController()(using jwtService: JwtService):

  private val authenticateUseCase = AuthenticateUserUseCase()

  val secureEndpoint: ZPartialServerEndpoint[Any, AuthenticationToken, (UserContext, PermissionContext), Unit, AuthenticationError, Unit, Any] =
    endpoint
      .securityIn(auth.bearer[String]().mapTo[AuthenticationToken])
      .errorOut(jsonBody[AuthenticationError])
      .zServerSecurityLogic(securityLayer)

  private def securityLayer(token: AuthenticationToken): IO[AuthenticationError, (UserContext, PermissionContext)] =
    (for 
      userAndPermission <- authenticateUseCase.execute(RequestAuthenticate(token))
    yield (userAndPermission.userContext, userAndPermission.permissionContext))
      .mapError(e => AuthenticationError(code = 1001))
