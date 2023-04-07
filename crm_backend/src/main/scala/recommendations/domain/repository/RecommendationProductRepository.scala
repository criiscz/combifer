package recommendations.domain.repository

import recommendations.domain.entity.RecommendationProduct
import product_lots.domain.entity.ProductLot

trait RecommendationProductRepository:
  def getRecommendationsForClient(clientId:Long): List[(RecommendationProduct, Product)]
