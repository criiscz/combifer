package sale_products.domain.entity

case class SaleProduct (
  id: Long = -1,
  productQuantity: Double,
  productDiscount: Float,
  productMeasureUnit: String,
  productUnitPrice: Double,
  productName: String, 
  productDescription: Option[String],
  saleId: Long,
  taxId: Long,
  productLotId: Long
)
