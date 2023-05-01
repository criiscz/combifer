package orders.infrastructure.controller

import zio._
import scala.util._
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import io.circe.generic.auto._
import sttp.tapir.generic.auto._

import shared.BaseController
import authentications.domain.service.JwtService
import shared.responses._
import shared.mapper.endpoints.Exposer._
import authentications.domain.entity.UserContext
import authorizations.domain.entity.PermissionContext
import orders.domain.repository.OrderRepository
import orders.domain.entity.Order
import order_products.domain.repository.OrderProductRepository
import product_lots.domain.repository.ProductLotRepository
import products.domain.repository.ProductRepository

import orders.application.get_order._
import orders.application.create_order._
import orders.application.get_orders._

class OrderController
(using 
  jwtService: JwtService,
  orderRepository: OrderRepository,
  orderProductRepository: OrderProductRepository,
  productLotRepository: ProductLotRepository,
  productRepository: ProductRepository)
extends BaseController:

  private val routeName = "orders"

  private val createOrder =
    secureEndpoint
    .in(routeName)
    .in(jsonBody[RequestCreateOrder])
    .post
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseCreateOrder])
    .exposeSecure

  private val createSaleRote: ZServerEndpoint[Any, Any] =
    createOrder.serverLogic{ (user:UserContext, permission:PermissionContext) => request =>
      CreateOrderUseCase(user).execute(
        request
      ).mapError(e => ErrorResponse(message="Can't create order"))
    }.expose

  private val getOrder =
    secureEndpoint
    .in(routeName  / path[Long]("id"))
    .get
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[ResponseGetOrder])
    .exposeSecure

  private val getOrderRoute =
    getOrder.serverLogic { (user:UserContext, permission:PermissionContext) => (id: Long) =>
      GetOrderUseCase().execute(
        RequestGetOrder(id)
      ).mapError(e => ErrorResponse(message = "Can't find order"))
    }.expose

  private val getOrders =
    secureEndpoint
    .in(routeName)
    .get
    .in(
      query[Int]("page").and(query[Int]("per_page"))
    )
    .errorOutVariant[ApplicationError](oneOfVariant(jsonBody[ErrorResponse]))
    .out(jsonBody[PaginatedResponse[Order]])
    .exposeSecure

  private val getOrdersRoute =
    getOrders.serverLogic { (user:UserContext, permission:PermissionContext) => (page: Int, perPage: Int) =>
      GetOrdersUseCase().execute(
        RequestGetOrders(page, perPage)
      )
      .mapError(e => ErrorResponse(message = "Can't get Orders"))
    }.expose
