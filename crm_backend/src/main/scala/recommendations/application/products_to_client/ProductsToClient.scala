package recommendations.application.products_to_client

import zio._
import org.apache.spark.sql._

import shared.application.BaseUseCase
import recommendations.domain.repository.RecommendationProductRepository
import recommendations.domain.service.SparkService

class ProductsToClient()
(using
  recommendationProductRepository: RecommendationProductRepository,
  sparkService: SparkService
)
extends BaseUseCase[RequestProductsToClient, ResponseProductsToClient]:

  override def execute(request: RequestProductsToClient): Task[ResponseProductsToClient] = 
    ZIO.succeed{

      val productHistoryOfClients = recommendationProductRepository.getProductsBoughtByClient()
     
      ResponseProductsToClient(true)
    } 
