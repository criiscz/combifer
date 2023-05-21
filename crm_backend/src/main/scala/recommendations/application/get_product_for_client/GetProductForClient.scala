package recommendations.application.get_product_for_client

import shared.application.BaseUseCase
import zio._
import recommendations.domain.repository.RecommendationProductRepository

class GetProductForClient
(using
  recommendationProductRepository: RecommendationProductRepository,
)
extends BaseUseCase[RequestGetProductForClient,ResponseGetProductForClient]:

  override def execute(request: RequestGetProductForClient): Task[ResponseGetProductForClient] = 
    ZIO.succeed{
      val products = recommendationProductRepository.getRecommendationsForClient(
          clientId = request.clientId
        )
      ResponseGetProductForClient(products)
    }
