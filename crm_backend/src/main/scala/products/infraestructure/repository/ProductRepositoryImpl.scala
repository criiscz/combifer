package products.infraestructure.repository

import products.domain.repository.ProductRepository
import products.domain.entity.Product
import shared.BaseRepository
import io.getquill._

class ProductRepositoryImpl extends ProductRepository with BaseRepository:

  implicit val myEntitySchemaMeta:SchemaMeta[Product] = schemaMeta[Product]("PRODUCTS")
  import ctx._

  override def getProduct(id: Long): Option[Product] =
    ctx
      .run(
        query[Product].filter(_.id == lift(id))
      ).headOption

  override def getProductsWithCategory(categoryId: Long): List[Product] = 
    ctx
      .run(
        query[Product]
          .filter(_.categoryProductId == lift(categoryId))
      )



