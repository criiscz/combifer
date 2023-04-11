package recommendations.application.products_to_client

import recommendations.domain.entity.RatingProductClient

case class ResponseProductsToClient (
  data: List[RatingProductClient]
)
