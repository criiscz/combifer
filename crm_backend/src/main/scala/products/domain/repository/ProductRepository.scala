package products.domain.repository

import products.domain.entity.Product

trait ProductRepository:
  def getProduct(id: Long): Option[Product]
  def getProductsWithCategory(categoryId:Long): List[Product]
  def getProductsWithLocation(locationId:Long): List[Product]
  def getProducts(from: Int, to:Int):List[Product]
  def getTotalAmountOfProducts(): Long
  def insertProduct(product: Product): Unit
  def updateProduct(product:Product):Unit
  def removeProduct(id: Long):Unit
