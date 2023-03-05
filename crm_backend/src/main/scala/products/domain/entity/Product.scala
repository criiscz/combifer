package products.domain.entity

case class Product(
  id: Long = -1,
  name: String, 
  description: Option[String],
  measureUnit: String,
  location_id: Long,
  category_product_id: Long
)
