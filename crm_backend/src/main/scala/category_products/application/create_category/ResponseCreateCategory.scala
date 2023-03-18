package category_products.application.create_category

import category_products.domain.entity.CategoryProduct

sealed case class ResponseCreateCategory (
  data: CategoryProduct
)
