package recommendations.application.get_product_for_client

import products.domain.entity.Product
import recommendations.domain.entity.RecommendationProduct

case class ResponseGetProductForClient (
  products: List[(RecommendationProduct, Product)]
)
