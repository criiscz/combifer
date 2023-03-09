package category_products.domain.entity

case class CategoryProduct(
  id: Long = -1,
  name: String,
  description: Option[String],
)
