package products.application.get_products

import products.domain.entity.Product
import shared.responses._

sealed class ResponseGetProducts(
  data:List[Product],
  request: RequestGetProducts,
  total: Long
) extends PaginatedResponse[Product](
  data,
  Meta(
    currentPage = request.page,
    lastPage= request.page,
    from=  request.page,
    to= request.page,
    total= total
  )
)
