package category_products.infrastructure.repository

import category_products.domain.repository.CategoryProductRepository
import category_products.domain.entity.CategoryProduct
import shared.BaseRepository

import zio._
import scala.quoted.Quotes
import io.getquill._

class CategoryProductRepositoryImpl extends CategoryProductRepository with BaseRepository:

  import ctx._

  override def getCategory(id: Long): Option[CategoryProduct] = 
    ctx.run(
        query[CategoryProduct].filter(_.id == lift(id))
      ).headOption

  override def getCategories(from:Int, to:Int):List[CategoryProduct] = 
    val q = quote {
      query[CategoryProduct]
        .sortBy(p => p.id)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
    }
    ctx.run(q)

  override def getTotalAmountOfCategories() = 
    ctx.run(query[CategoryProduct].size)

  override def insertCategory(category:CategoryProduct): CategoryProduct = 
    ctx.run(
      query[CategoryProduct]
        .insertValue( lift(category)).returning(r => r)
    )

  override def updateCategory(category:CategoryProduct): CategoryProduct  = 
    ctx.run(
      query[CategoryProduct]
      .filter(_.id == lift(category.id))
      .updateValue(lift(category))
      .returning(r => r)
    )

  override def removeCategory(id: Long): CategoryProduct  =
    ctx.run(
      query[CategoryProduct]
        .filter(_.id == lift(id))
        .delete
        .returning(r => r)
    )

