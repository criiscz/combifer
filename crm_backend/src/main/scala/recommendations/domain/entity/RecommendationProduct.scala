package recommendations.domain.entity

import java.time.LocalDate

case class RecommendationProduct (
  id: Long,
  clientId: Long,
  productId:Long,
  createDate: LocalDate
)
