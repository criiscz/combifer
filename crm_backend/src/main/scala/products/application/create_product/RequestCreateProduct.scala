package products.application.create_product

case class RequestCreateProduct(
  name: String,
  description: Option[String],
  measureUnit: String,
  locationId: Long,
  categoryProductId: Long
)
