package products.infrastructure.repository

import products.domain.repository.ProductRepository
import products.domain.entity.Product
import shared.BaseRepository
import io.getquill._

class ProductRepositoryImpl extends ProductRepository with BaseRepository:

  import ctx._

  override def getProduct(id: Long): Option[Product] =
    ctx.run(
      query[Product].filter(_.id == lift(id))
    ).headOption

  override def getProductsWithCategory(categoryId: Long, from: Int, to:Int): List[Product] = 
    ctx.run(
      query[Product]
        .filter(_.categoryProductId == lift(categoryId))
        .take(lift(to))
        .drop(lift(from))
    )

  override def getProducts(from: Int, to: Int):List[Product] = 
    ctx.run(
      query[Product]
        .sortBy(_.id)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
    )

  override def getTotalAmountOfProducts():Long = 
    ctx.run(query[Product].size)

  override def insertProduct(product:Product):Product =
    ctx.run(
      query[Product]
        .insertValue(lift(product))
        .returning(r => r)
    )

  override def updateProduct(product:Product):Product =
    ctx.run(
      query[Product]
        .filter(_.id == lift(product.id))
        .updateValue(lift(product))
        .returning(r => r)
    )

  override def removeProduct(id: Long): Product = 
    ctx.run(
      query[Product]
        .filter(_.id == lift(id))
        .delete
        .returning(r => r)
    )

  override def getProductsWithLocation(locationId: Long, from: Int, to:Int): List[Product] =
    ctx.run(
      query[Product]
        .filter(_.locationId == lift(locationId))
        .take(lift(to))
        .drop(lift(from))
      )
