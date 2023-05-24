package product_lots.domain.entity

import java.time.LocalDate

case class ProductLot(
  id: Long = -1, 
  price: Double,
  basePrice: Double,
  enterDate: LocalDate,
  emptynessDate: Option[LocalDate],
  quantity: Long,
  productId: Long,
)
