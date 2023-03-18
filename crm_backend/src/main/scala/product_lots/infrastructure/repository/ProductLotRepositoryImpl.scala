package product_lots.infrastructure.repository

import product_lots.domain.repository.ProductLotRepository
import shared.BaseRepository
import product_lots.domain.entity.ProductLot
import io.getquill._

class ProductLotRepositoryImpl extends ProductLotRepository with BaseRepository:

  import ctx._
  implicit val myEntitySchemaMeta:SchemaMeta[ProductLot] = 
    schemaMeta[ProductLot]("products_lots")
  implicit val excludeInsert:InsertMeta[ProductLot] =
    insertMeta[ProductLot](_.id)
  implicit val excludeUpdate:UpdateMeta[ProductLot] = 
    updateMeta[ProductLot](_.id)

  override def getLots(from: Int, to: Int): List[ProductLot] =
     ctx.run(
       query[ProductLot]
       .sortBy(_.id)(Ord.ascNullsLast)
        .drop(lift(from))
        .take(lift(to))
     )

  override def getTotalAmountOfLots(): Long = 
    ctx.run(query[ProductLot].size)

  override def insertLot(lot: ProductLot): ProductLot = 
    ctx.run(
      query[ProductLot]
      .insertValue(lift(lot))
      .returning(r => r)
    )

  override def removeLot(id: Long): ProductLot =
    ctx.run(
      query[ProductLot]
      .filter(_.id == lift(id))
      .delete
      .returning(r => r)
    )

  override def getLotsOfProduct(productId: Long, from: Int, to: Int): List[ProductLot] = 
    ctx.run(
      query[ProductLot]
      .filter(_.productId == lift(productId))
    )

  override def getLot(id: Long): Option[ProductLot] = 
    ctx.run(
      query[ProductLot]
      .filter(_.id == lift(id))
    ).headOption

  override def updateLot(lot: ProductLot): ProductLot = 
    ctx.run(
      query[ProductLot]
      .updateValue(lift(lot))
      .returning(r => r)
    )

  override def getTotalAmountOfLotsAtProduct(productId: Long): Long = 
    ctx.run(
      query[ProductLot]
      .filter(_.productId == lift(productId))
      .size
    )

