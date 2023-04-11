package recommendations.domain.repository

import recommendations.domain.entity._
import product_lots.domain.entity.ProductLot
import agents.domain.entity.Agent

trait RecommendationProductRepository:
  def getRecommendationsForClient(clientId:Long): List[(RecommendationProduct, Product)]
  def getProductsBoughtByClient(): List[RatingProductClient]
