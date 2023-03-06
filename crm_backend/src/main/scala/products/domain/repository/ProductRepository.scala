package products.domain.repository

import products.domain.entity.Product

trait ProductRepository:
  def getProduct(id: Long): Option[Product]
  def getProductsWithCategory(categoryId:Long): List[Product]
