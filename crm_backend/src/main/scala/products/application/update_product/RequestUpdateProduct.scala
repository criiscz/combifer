package products.application.update_product

case class RequestUpdateProduct(
  name: String,
  description: Option[String],
  measureUnit: String,
  locationId: Long,
  categoryProductId: Long
)
