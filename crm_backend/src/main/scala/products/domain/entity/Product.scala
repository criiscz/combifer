package products.domain.entity

case class Product(
  id: Long = -1,
  name: String, 
  description: Option[String],
  measureUnit: String,
  locationId: Long,
  categoryProductId: Long
)
