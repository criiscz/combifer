package category_products.infrastructure.repository

import category_products.domain.repository.CategoryProductRepository
import category_products.domain.entity.CategoryProduct
import shared.BaseRepository

import zio._
import scala.quoted.Quotes
import io.getquill._
import com.zaxxer.hikari.HikariDataSource

class CategoryProductRepositoryImpl extends CategoryProductRepository with BaseRepository:

  implicit val myEntitySchemaMeta:SchemaMeta[CategoryProduct] = schemaMeta[CategoryProduct]("CATEGORY_PRODUCTS")
  import ctx._

  override def getCategory(id: Long): Option[CategoryProduct] = 
    ctx
      .run(
        query[CategoryProduct].filter(_.id == lift(id))
      ).headOption

  override def getCategories(from:Int, to:Int):List[CategoryProduct] = 
    val q = quote {
      query[CategoryProduct]
        .sortBy(p => p.id)(Ord.ascNullsLast)
        .drop(lift(from))
        .take(lift(to))
    }
    ctx.run(q)

  override def getTotalAmountOfCategories() = 
    ctx.run(query[CategoryProduct].size)

  override def insertCategory(category:CategoryProduct): Unit = 
    implicit val excludeInsert = insertMeta[CategoryProduct](_.id)
    ctx.run(
      query[CategoryProduct]
        .insertValue( lift(category))
    )

  override def updateCategory(category:CategoryProduct): Unit = 
    implicit val excludeUpdate = updateMeta[CategoryProduct](_.id)
    ctx.run(
      query[CategoryProduct]
      .filter(_.id == lift(category.id))
      .updateValue(lift(category)))

  override def removeCategory(id: Long): Unit =
    ctx.run(
      query[CategoryProduct]
        .filter(_.id == lift(id))
        .delete
    )

