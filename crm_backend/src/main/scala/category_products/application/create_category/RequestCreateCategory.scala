package category_products.application.create_category

sealed case class RequestCreateCategory(
  val name: String,
  val description: Option[String]
)


