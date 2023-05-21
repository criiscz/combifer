package recommendations.application.products_to_client

import recommendations.domain.entity.RecommendationProduct

case class ResponseProductsToClient (
  data: List[RecommendationProduct]
)
