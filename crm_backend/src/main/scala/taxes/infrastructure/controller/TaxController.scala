package taxes.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import authentications.domain.service.JwtService
import authentications.domain.entity._
import authorizations.domain.entity._
import authentications.domain.error._
import shared.mapper.endpoints.Exposer._
import taxes.domain.entity.Tax
import shared.responses._
import taxes.application.get_taxes._
import taxes.domain.repository.TaxRepository
import shared.BaseController

class TaxController()
(using 
  jwtService: JwtService, 
  taxRepository:TaxRepository)
extends BaseController:

  private val getTaxes: ZPartialServerEndpoint[Any, AuthenticationToken, (UserContext, PermissionContext), (Int, Int), ApplicationError, PaginatedResponse[Tax], Any] = 
    secureEndpoint
    .get
    .in("taxes")
    .get
    .in(
      query[Int]("page").and(query[Int]("per_page"))
    )
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[PaginatedResponse[Tax]])
    .exposeSecure

  private val getTaxRoute: ZServerEndpoint[Any, Any] =
    getTaxes.serverLogic{ (user:UserContext, permission:PermissionContext) => (page:Int, perPage:Int)=>
      GetTaxesUseCase().execute(
        RequestGetTaxes(page, perPage) 
      )
      .mapError(e => ErrorResponse(message="Can't get taxes"))
    }.expose

