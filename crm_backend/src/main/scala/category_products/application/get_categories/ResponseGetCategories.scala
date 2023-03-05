package category_products.application.get_categories

import category_products.domain.entity.CategoryProduct
import shared.responses.PaginatedResponse
import shared.responses.Meta

sealed class ResponseGetCategories(
  data:List[CategoryProduct],
  request: RequestGetCategories,
  total: Long
) extends PaginatedResponse[CategoryProduct](
  data,
  Meta(
    currentPage = request.page,
    lastPage= request.page,
    from=  request.page,
    to= request.page,
    total= total
    )
)
