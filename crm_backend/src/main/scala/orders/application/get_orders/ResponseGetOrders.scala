package orders.application.get_orders

import orders.domain.entity.Order
import shared.responses._

sealed class ResponseGetOrders(
  data: List[Order],
  request: RequestGetOrders,
  total: Long
) extends PaginatedResponse[Order](
  data,
  Meta(
    currentPage = request.page,
    lastPage = request.page,
    from =  request.page,
    to = request.page,
    total = total
  )
)
