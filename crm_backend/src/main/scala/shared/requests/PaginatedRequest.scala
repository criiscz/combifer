package shared.requests

class PaginatedRequest (
  page:Int,
  perPage:Int
) {
  lazy val from = perPage * page
  lazy val to = from + perPage
}
