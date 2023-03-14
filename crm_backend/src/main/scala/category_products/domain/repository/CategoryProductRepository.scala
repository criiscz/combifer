package category_products.domain.repository

import category_products.domain.entity.CategoryProduct

trait CategoryProductRepository:
  def getCategory(id: Long):Option[CategoryProduct]
  def getCategories(from:Int, to:Int):List[CategoryProduct]
  def getTotalAmountOfCategories():Long
  def insertCategory(category:CategoryProduct): Unit
  def updateCategory(category:CategoryProduct): Unit
  def removeCategory(id: Long): Unit
