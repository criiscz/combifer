package orders.application.create_order

case class RequestCreateOrder (
  description: Option[String],
  products: List[OrderProductInformation]
)

case class OrderProductInformation (
  quantity: Int,
  baseUnitPrice: Float,
  unitPrice:Float,
  name: String,
  lotId: Option[Long],
  productId: Long
)
