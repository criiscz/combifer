package product_lots.application.get_lots

import shared.responses._
import product_lots.domain.entity.ProductLot
import products.domain.entity.Product
import locations.domain.entity.Location
import category_products.domain.entity.CategoryProduct

sealed class ResponseGetLots(
  data:List[ProductLotInformation],
  request: RequestGetLots,
  total: Long
) extends PaginatedResponse[ProductLotInformation](
  data,
  Meta(
    currentPage = request.page,
    lastPage = request.page,
    from =  request.page,
    to = request.page,
    total = total
  )
)

case class ProductLotInformation(
  lot: ProductLot,
  product: Product,
  location: Location,
  category: CategoryProduct
)
