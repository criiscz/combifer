package product_lots.application.update_lot

import java.time.LocalDate

case class RequestUpdateLot (
  price: Double,
  enterDate: LocalDate,
  emptynessDate: Option[LocalDate],
  quantity: Long,
  productId: Long,
)

