package products.application.create_product

import products.domain.entity.Product

sealed case class ResponseCreateProduct(
  data: Product
)
