package orders.infrastructure.controller

import zio._
import scala.util._
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import io.circe.generic.auto._
import sttp.tapir.generic.auto._

import shared.BaseController
import authentications.domain.service.JwtService
import orders.application.create_order._
import shared.responses._
import shared.mapper.endpoints.Exposer._
import authentications.domain.entity.UserContext
import authorizations.domain.entity.PermissionContext
import orders.domain.repository.OrderRepository
import order_products.domain.repository.OrderProductRepository
import product_lots.domain.repository.ProductLotRepository
import products.domain.repository.ProductRepository

class OrderController
(using 
  jwtService: JwtService,
  orderRepository: OrderRepository,
  orderProductRepository: OrderProductRepository,
  productLotRepository: ProductLotRepository,
  productRepository: ProductRepository)
extends BaseController:

  private val createOrder =
    secureEndpoint
    .in("orders")
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

