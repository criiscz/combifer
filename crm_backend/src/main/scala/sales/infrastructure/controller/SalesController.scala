package sales.infrastructure.controller

import zio._
import scala.util._
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import io.circe.generic.auto._
import sttp.tapir.generic.auto._

import shared.BaseController
import shared.responses._
import sales.application.create_sale._
import sales.application.get_sale._
import sales.application.get_sales._

import authentications.domain.entity._
import authorizations.domain.entity._
import authentications.domain.service.JwtService
import authentications.domain.repository.AuthenticationRepository

import notifications.domain.service.EmailNotificationService

import sales.domain.repository.SaleRepository
import sale_products.domain.repository.SaleProductRepository
import product_lots.domain.repository.ProductLotRepository
import shared.mapper.endpoints.Exposer._
import sales.domain.entity.Sale


class SalesController
(using
  jwtService: JwtService,
  saleProductRepository: SaleProductRepository,
  saleRepository: SaleRepository,
  productLotRepository: ProductLotRepository,
  authenticationRepository: AuthenticationRepository,
  emailNotificationService: EmailNotificationService
)
extends BaseController:

  private val routeName = "sales"

  private val createSale =
    secureEndpoint
    .in(routeName)
    .in(jsonBody[RequestCreateSale])
    .post
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseCreateSale])
    .exposeSecure

  private val createSaleRote =
    createSale.serverLogic{ (user:UserContext, permission:PermissionContext) => request =>
      CreateSaleUseCase(user).execute(
        request
      ).mapError(e => ErrorResponse(message="Can't create sale"))
    }.expose

  private val getSale =
    secureEndpoint
    .in(routeName  / path[Long]("id"))
    .get
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseGetSale])
    .exposeSecure

  private val getSaleRoute =
    getSale.serverLogic { (user:UserContext, permission:PermissionContext) => (id: Long) =>
      GetSaleUseCase().execute(
        RequestGetSale(id)
      ).mapError(e => ErrorResponse(message = "Can't find sale"))
    }.expose

  private val getSales =
    secureEndpoint
    .in(routeName)
    .get
    .in(
      query[Int]("page").and(query[Int]("per_page"))
    )
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[PaginatedResponse[Sale]])
    .exposeSecure

  private val getSalesRoute =
    getSales.serverLogic { (user:UserContext, permission:PermissionContext) => (page: Int, perPage: Int) =>
      GetSalesUseCase().execute(
        RequestGetSales(page, perPage)
      )
      .mapError(e => ErrorResponse(message = "Can't get sales"))
    }.expose
