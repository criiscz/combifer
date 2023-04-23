package shared

import sttp.model.HeaderNames
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.ztapir._
import zio.http.{HttpApp, Server, ServerConfig}
import zio.{Console, ExitCode, IO, Scope, Task, ZIO, ZIOAppDefault}

class BaseController:

  case class User(name: String)
  case class AuthenticationToken(value: String)

  def authenticate(token: AuthenticationToken): IO[AuthenticationError, User] =
    ZIO.succeed {
      if (token.value == "berries") ZIO.succeed(User("Papa Smurf"))
      else if (token.value == "smurf") ZIO.succeed(User("Gargamel"))
      else ZIO.fail(AuthenticationError(1001))
    }.flatten

  // defining a base endpoint, which has the authentication logic built-in
  val secureEndpoint: ZPartialServerEndpoint[Any, AuthenticationToken, User, Unit, AuthenticationError, Unit, Any] =
    endpoint
      .securityIn(auth.bearer[String]().mapTo[AuthenticationToken])
      .errorOut(plainBody[Int].mapTo[AuthenticationError])
      .zServerSecurityLogic(authenticate)

case class AuthenticationError(code: Int)
