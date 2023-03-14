package product_lots.domain.entity

import java.time.LocalDate

case class ProductLot(
  id: Long, 
  price: Double,
  enterDate: LocalDate,
  emptynessDate: Option[LocalDate],
  productId: Long,
)
