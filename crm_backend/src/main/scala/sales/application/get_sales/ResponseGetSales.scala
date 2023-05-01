package sales.application.get_sales

import sales.domain.entity.Sale
import shared.responses._

sealed class ResponseGetSales (
  data: List[Sale],
  request: RequestGetSales,
  total: Long
) extends PaginatedResponse[Sale](
  data,
  Meta(
    currentPage = request.page,
    lastPage = request.page,
    from = request.page,
    to = request.page,
    total = total
  )
)
