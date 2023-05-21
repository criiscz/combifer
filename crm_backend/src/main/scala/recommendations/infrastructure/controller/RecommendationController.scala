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

  private val getProductRecommendationToClient: PublicEndpoint[Long, ErrorResponse, ResponseGetProductForClient, Any] =
    endpoint
    .in("recommendation_product")
    .get
    .in(query[Long]("client_id"))
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseGetProductForClient])
    .expose

  private val getProductRecommendatonToClientRoute: ZServerEndpoint[Any, Any] = 
    getProductRecommendationToClient.zServerLogic { (clientId:Long) =>
       GetProductForClient()
         .execute(RequestGetProductForClient(clientId))
         .mapError(e => ErrorResponse(message="Can't get recommendation"))
    }.expose

  private val generateRecommendations: PublicEndpoint[String, ErrorResponse, ResponseProductsToClient, Any] =
    endpoint
      .in("generate_recommendations")
      .get
      .in(query[String]("strategy"))
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseProductsToClient])
      .expose

  private val generateRecommendationsRoute: ZServerEndpoint[Any, Any] =
    generateRecommendations.zServerLogic { strategy =>
      ProductsToClient()
        .execute(RequestProductsToClient(strategy))
        .mapError(e => ErrorResponse(message = "Can't create recommendations"))
    }.expose
