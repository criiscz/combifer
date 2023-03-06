package products.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import shared.BaseController
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import products.domain.repository.ProductRepository
import products.application.get_product._
import shared.responses.ErrorResponse

class ProductController()(using productRepository:ProductRepository) extends BaseController:

  override def routes() = List(getProduct)

  override def endpoints() = List(getProductRoute)

  private val getProduct: PublicEndpoint[Long, ErrorResponse , ResponseGetProduct, Any] = 
    endpoint
    .in("products" / path[Long]("id"))
    .get
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseGetProduct])

  private val getProductRoute: ZServerEndpoint[Any, Any] = getProduct.zServerLogic { (id:Long) =>
    GetProductUseCase().execute(RequestGetProduct(id)) match {
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message="Product not found"))
    }
  }

