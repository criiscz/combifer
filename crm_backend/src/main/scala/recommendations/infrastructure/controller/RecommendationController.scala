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

class RecommendationController()
(using jwtService: JwtService) 
extends BaseController():

  private val getProductRecommendationToClient: PublicEndpoint[RequestGetProductForClient, ErrorResponse , ResponseGetProductForClient, Any] = 
    endpoint
    .in("recommendation/product")
    .in(jsonBody[RequestGetProductForClient])
    .get
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseGetProductForClient])
    .expose

  private val getProductRecommendatonToClientRoute: ZServerEndpoint[Any, Any] = 
    getProductRecommendationToClient.zServerLogic { (request:RequestGetProductForClient) =>
      GetProductForClient()
        .execute(request)
        .mapError(e => ErrorResponse(message="Can't get recommendation"))
    }.expose
