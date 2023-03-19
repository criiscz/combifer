package product_lots.application.get_lot

import product_lots.domain.entity.ProductLot
import products.domain.entity.Product
import locations.domain.entity.Location
import category_products.domain.entity.CategoryProduct

case class ResponseGetLot(
  lot: ProductLot,
  product: Product,
  location: Location,
  category: CategoryProduct
)
