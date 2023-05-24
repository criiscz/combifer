package product_lots.application.create_lot

import java.time.LocalDate

case class RequestCreateLot(
  price: Double,
  basePrice: Double,
  enterDate: LocalDate,
  emptynessDate: Option[LocalDate],
  quantity: Option[Long],
  productId: Long,
)
