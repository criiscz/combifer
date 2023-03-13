package products.infrastructure.repository

import products.domain.repository.ProductRepository
import products.domain.entity.Product
import shared.BaseRepository
import io.getquill._

class ProductRepositoryImpl extends ProductRepository with BaseRepository:

  import ctx._

  implicit val myEntitySchemaMeta:SchemaMeta[Product] = 
    schemaMeta[Product]("products")
  implicit val excludeInsert:InsertMeta[Product] =
    insertMeta[Product](_.id)
  implicit val excludeUpdate:UpdateMeta[Product] = 
    updateMeta[Product](_.id)

  override def getProduct(id: Long): Option[Product] =
    ctx.run(
      query[Product].filter(_.id == lift(id))
    ).headOption

  override def getProductsWithCategory(categoryId: Long): List[Product] = 
    ctx.run(
      query[Product]
        .filter(_.categoryProductId == lift(categoryId))
    )

  override def getProducts(from: Int, to: Int):List[Product] = 
    ctx.run(
      query[Product]
        .sortBy(_.id)(Ord.ascNullsLast)
        .drop(lift(from))
        .take(lift(to))
    )

  override def getTotalAmountOfProducts():Long = 
    ctx.run(query[Product].size)

  override def insertProduct(product:Product):Unit =
    ctx.run(
      query[Product].insertValue(lift(product))
    )

  override def updateProduct(product:Product):Unit =
    ctx.run(
      query[Product]
        .filter(_.id == lift(product.id))
        .updateValue(lift(product))
    )

  override def removeProduct(id: Long): Unit = 
    ctx.run(
      query[Product]
        .filter(_.id == lift(id))
        .delete
    )

  override def getProductsWithLocation(locationId: Long): List[Product] =
    ctx.run(
      query[Product]
        .filter(_.locationId == lift(locationId))
      )
