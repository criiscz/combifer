package recommendations.domain.entity

import java.time.LocalDate

case class RecommendationProduct (
  id: Long = -1,
  clientId: Long,
  productId:Long,
  recommendedRate: Double,
  createDate: LocalDate = LocalDate.now()
)
