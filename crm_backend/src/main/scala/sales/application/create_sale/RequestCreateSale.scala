package sales.application.create_sale

case class RequestCreateSale(
  description: Option[String],
  clientId:Long,
  products: List[SaleProductInformation]
)

case class SaleProductInformation(
  lotId:Long,
  quantity: Long,
  discount: Double,
  taxId: Long
)
