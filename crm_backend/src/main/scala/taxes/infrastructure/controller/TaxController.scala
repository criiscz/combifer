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
import taxes.application.remove_tax._
import taxes.application.create_tax._
import taxes.application.update_tax._
import taxes.domain.repository.TaxRepository
import shared.BaseController

class TaxController()
(using 
  jwtService: JwtService, 
  taxRepository:TaxRepository)
extends BaseController:

  private val getTaxes =
    secureEndpoint
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

  private val removeTax = 
    secureEndpoint
    .in("taxes" / path[Long]("id"))
    .delete
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseRemoveTax])
    .exposeSecure

  private val removeTaxRoute: ZServerEndpoint[Any, Any] =
    removeTax.serverLogic{ (user:UserContext, permission:PermissionContext) => (id:Long) =>
      RemoveTaxUseCase().execute(
          RequestRemoveTax(id)
      ).mapError(e => ErrorResponse(message="Can't remove tax"))
    }.expose

  private val createTax = 
    secureEndpoint
    .in("taxes")
    .in(jsonBody[RequestCreateTax])
    .post
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseCreateTax])
    .exposeSecure

  private val createTaxRoute: ZServerEndpoint[Any, Any] =
    createTax.serverLogic{ (user:UserContext, permission:PermissionContext) => request =>
      CreateTaxUseCase().execute(
        request
      ).mapError(e => ErrorResponse(message="Can't remove tax"))
    }.expose

  private val updateTax = 
    secureEndpoint
    .in("taxes" / path[Long]("id"))
    .put
    .in(jsonBody[RequestUpdateTax])
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseUpdateTax])
    .exposeSecure

  private val updateTaxRoute: ZServerEndpoint[Any, Any] =
    updateTax.serverLogic{ (user:UserContext, permission:PermissionContext) => (id: Long, request: RequestUpdateTax) =>
      UpdateTaxUseCase(id).execute(
        request
      ).mapError(e => ErrorResponse(message="Can't update tax"))
    }.expose
