package product_lots.domain.entity

import java.time.LocalDate

case class ProductLot(
  id: Long = -1, 
  price: Double,
  enterDate: LocalDate,
  quantity: Long,
  emptynessDate: Option[LocalDate],
  productId: Long,
  basePrice: Double,
)
