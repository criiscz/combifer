package category_products.application.get_categories

protected sealed class RequestGetCategories private (
  val page: Int,
  val perPage: Int
)

object RequestGetCategories:
  def create(
    page: Int,
    perPage: Int
  ) =
    RequestGetCategories(
      page,
      perPage
    )
