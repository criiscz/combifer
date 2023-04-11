package orders.application.create_order

case class RequestCreateOrder (
  description: Option[String],
  products: List[OrderProductInformation]
)

case class OrderProductInformation (
  quantity: Int,
  unitPrice: Float,
  name: String,
  isNewLot: Boolean
)
