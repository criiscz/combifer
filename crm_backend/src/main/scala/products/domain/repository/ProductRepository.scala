package products.domain.repository

import products.domain.entity.Product

trait ProductRepository:
  def getProduct(id: Long): Option[Product]
  def getProductsWithCategory(categoryId:Long, from: Int = 0, to:Int = Int.MaxValue): List[Product]
  def getProductsWithLocation(locationId:Long, from: Int = 0, to:Int = Int.MaxValue): List[Product]
  def getProducts(from: Int, to:Int):List[Product]
  def getTotalAmountOfProducts(): Long
  def insertProduct(product: Product): Product
  def updateProduct(product:Product):Product
  def removeProduct(id: Long):Product
