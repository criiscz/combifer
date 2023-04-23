package category_products.application.update_category

import category_products.domain.entity.CategoryProduct

sealed case class ResponseUpdateCategory(
  data: CategoryProduct
)
