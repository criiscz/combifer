package products.application.get_products

case class RequestGetProducts(
  val page: Int,
  val perPage: Int
)
