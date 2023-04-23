package recommendations.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import shared.BaseController
import authentications.domain.service.JwtService
import shared.responses.ErrorResponse
import shared.mapper.endpoints.Exposer._
import recommendations.application.get_product_for_client._
import recommendations.domain.repository.RecommendationProductRepository
import recommendations.domain.service.SparkService

import recommendations.application.products_to_client._

class RecommendationController()
(using jwtService: JwtService,
  recommendationProductRepository: RecommendationProductRepository,
  sparkService: SparkService
)
extends BaseController():

  private val getProductRecommendationToClient: PublicEndpoint[Long, ErrorResponse, ResponseProductsToClient, Any] = 
    endpoint
    .in("recommendation_product" / path[Long]("id"))
    .get
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseProductsToClient])
    .expose

  private val getProductRecommendatonToClientRoute: ZServerEndpoint[Any, Any] = 
    getProductRecommendationToClient.zServerLogic { (id:Long) =>
      ProductsToClient()
        .execute(RequestProductsToClient("nice"))
        .mapError(e => ErrorResponse(message="Cant recommend!"))
      // GetProductForClient()
      //   .execute(request)
      //   .mapError(e => ErrorResponse(message="Can't get recommendation"))
    }.expose
