package category_products.application.update_category

case class RequestUpdateCategory(
  val name: String,
  val description: Option[String]
){
    var id: Long = -1
}
