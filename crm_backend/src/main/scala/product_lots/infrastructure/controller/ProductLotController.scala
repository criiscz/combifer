package product_lots.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._

import product_lots.domain.repository.ProductLotRepository
import product_lots.application.create_lot._
import product_lots.application.get_lot._
import product_lots.application.get_lots._
import product_lots.application.update_lot._
import product_lots.application.remove_lot._

import product_lots.domain.entity._

import shared.responses._
import shared.mapper.endpoints.Exposer._
import zio._

class ProductLotController() (using productLotRepository: ProductLotRepository):

  private val createProductLot: PublicEndpoint[RequestCreateLot, ErrorResponse, ResponseCreateLot, Any] =
    endpoint
      .in("product-lots")
      .in(jsonBody[RequestCreateLot])
      .post
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseCreateLot])
      .expose
  
  private val createProductLotRoute: ZServerEndpoint[Any, Any] = createProductLot.zServerLogic{ request => 
    CreateLotUseCase()
      .execute(request) 
      .mapError(e => ErrorResponse(message="Can't create product lot"))
  }.expose

  private val getProductLot:PublicEndpoint[Long, ErrorResponse, ResponseGetLot, Any] =
    endpoint
      .in("product-lots"/ path[Long]("id"))
      .get
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseGetLot])
      .expose

  private val getProductLotRoute: ZServerEndpoint[Any, Any] = getProductLot.zServerLogic{ id => 
    GetLotUseCase()
      .execute(RequestGetLot(id)) 
      .mapError(e => ErrorResponse(message="Can't create product lot"))
  }.expose

  private val getProductLots:PublicEndpoint[(Int, Int, Option[String]), ErrorResponse, PaginatedResponse[ProductLotInformation], Any] =
    endpoint
      .in("product-lots")
      .in(
        query[Int]("page")
          .and(query[Int]("per_page"))
          .and(query[Option[String]]("search"))
      )
      .get
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[PaginatedResponse[ProductLotInformation]])
      .expose

  private val getProductLotsRoute: ZServerEndpoint[Any, Any] = getProductLots.zServerLogic{ (page, perPage, search) =>
    GetLotsUseCase()
      .execute(RequestGetLots(page, perPage, search))
      .mapError(e => ErrorResponse(message="Can't create product lot"))
  }.expose

  private val updateProductLot: PublicEndpoint[(Long, RequestUpdateLot), ErrorResponse , ResponseUpdateLot, Any] = 
    endpoint
    .in("product-lots" / path[Long]("id"))
    .put
    .in(jsonBody[RequestUpdateLot])
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseUpdateLot])
    .expose

  private val updateProductLotRoute: ZServerEndpoint[Any, Any] = updateProductLot.zServerLogic{ (id, request) => 
    UpdateLotUseCase(id)
      .execute(request) 
      .mapError(e => ErrorResponse(message="Can't create product lot"))
  }.expose

  private val removeProductLot:PublicEndpoint[Long, ErrorResponse, ResponseRemoveLot, Any] = 
    endpoint
    .in("product-lots" / path[Long]("id"))
    .delete
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseRemoveLot])
    .expose

  private val removeProductLotRoute:ZServerEndpoint[Any, Any] = removeProductLot.zServerLogic{ id => 
    RemoveLotUseCase()
      .execute(RequestRemoveLot(id)) 
      .mapError(e => ErrorResponse(message="Can't create product lot"))
  }.expose
