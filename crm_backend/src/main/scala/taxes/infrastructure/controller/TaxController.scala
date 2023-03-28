package taxes.infrastructure.controller

import zio._
import shared.BaseController
import scala.util._
import sttp.model.HeaderNames
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import io.circe.generic.auto._
import sttp.tapir.generic.auto._

import authentications.domain.service.JwtService
import authentications.domain.entity._
import authorizations.domain.entity._
import authentications.domain.error._
import shared.mapper.endpoints.Exposer._
import taxes.domain.entity.Tax
import shared.responses.ErrorResponse
import shared.responses.AuthenticationErrorResponse
import shared.responses.ApplicationError

class TaxController()
(using jwtService: JwtService) 
extends BaseController:

  private val getTax: ZPartialServerEndpoint[Any, AuthenticationToken, (UserContext, PermissionContext), Unit, ApplicationError, Tax, Any] = 
    secureEndpoint
    .get
    .in("tax")
    .get
    .out(jsonBody[Tax])
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .exposeSecure

  private val getTaxRoute: ZServerEndpoint[Any, Any] =
    getTax.serverLogic{ (user:UserContext, permission:PermissionContext) => _ =>
      ZIO.succeed(Tax(name = "", description = None, value = 0.3))
    }.expose

