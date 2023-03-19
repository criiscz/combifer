package product_lots.application.get_lots

import shared.responses._
import product_lots.domain.entity.ProductLot

sealed class ResponseGetLots(
  data:List[ProductLot],
  request: RequestGetLots,
  total: Long
) extends PaginatedResponse[ProductLot](
  data,
  Meta(
    currentPage = request.page,
    lastPage= request.page,
    from =  request.page,
    to = request.page,
    total = total
  )
)
