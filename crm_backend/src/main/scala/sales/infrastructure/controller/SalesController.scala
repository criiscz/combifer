package sales.infrastructure.controller

import zio._
import scala.util._
import sttp.model.HeaderNames
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import io.circe.generic.auto._
import sttp.tapir.generic.auto._

import shared.BaseController
import shared.responses._
import sales.application.create_sale._
import authentications.domain.entity._
import authorizations.domain.entity._

import authentications.domain.service.JwtService
import sales.domain.repository.SaleRepository
import sale_products.domain.repository.SaleProductRepository
import product_lots.domain.repository.ProductLotRepository
import shared.mapper.endpoints.Exposer._

class SalesController ()
(using 
  jwtService: JwtService,
  saleProductRepository: SaleProductRepository,
  saleRepository: SaleRepository,
  productLotRepository: ProductLotRepository)
extends BaseController:

  private val createSale =
    secureEndpoint
    .in("sales")
    .in(jsonBody[RequestCreateSale])
    .post
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseCreateSale])
    .exposeSecure

  private val getTaxRoute: ZServerEndpoint[Any, Any] =
    createSale.serverLogic{ (user:UserContext, permission:PermissionContext) => request =>
      CreateSaleUseCase(user).execute(
        request
      ).mapError(e => ErrorResponse(message="Can't create sale"))
    }.expose
