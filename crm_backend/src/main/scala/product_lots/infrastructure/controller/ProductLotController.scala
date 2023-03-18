package product_lots.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._

import product_lots.domain.repository.ProductLotRepository
import product_lots.application.create_lot._

import shared.responses._
import shared.mapper.endpoints.Exposer._
import zio._

class ProductLotController() (using productLotRepository: ProductLotRepository):

  private val createProductLot: PublicEndpoint[RequestCreateLot, ErrorResponse, ResponseCreateLot, Any] =
    endpoint
      .in("products-lots")
      .in(jsonBody[RequestCreateLot])
      .post
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseCreateLot])
      .expose
  
  private val createProductLotRoute: ZServerEndpoint[Any, Any] = createProductLot.zServerLogic{ request => 
    CreateLotUseCase().execute(request) match {
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message = "Can't create product lot")) 
    }
  }.expose

