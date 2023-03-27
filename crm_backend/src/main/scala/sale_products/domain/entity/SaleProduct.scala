package sale_products.domain.entity

case class SaleProduct (
  id: Long,
  productQuantity: Double,
  productDiscount: Float,
  productMeasureUnit: String,
  productUnitPrice: Float,
  productName: String, 
  productDescription: Option[String],
  saleId: Long,
  taxId: Long,
  productLotId: Long
)
