package product_lots.infrastructure.repository

import product_lots.domain.repository.ProductLotRepository

import products.domain.entity.Product
import product_lots.domain.entity.ProductLot
import category_products.domain.entity.CategoryProduct
import locations.domain.entity.Location

import shared.BaseRepository
import io.getquill._

class ProductLotRepositoryImpl extends ProductLotRepository with BaseRepository:

  import ctx._

  override def getLots(from: Int, to: Int): List[ProductLot] =
     ctx.run(
       query[ProductLot]
        .sortBy(_.id)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
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

  override def getLotWithProduct(id: Long): Option[(ProductLot,Product)] = 
    val q = quote {
      for {
        lot <- query[ProductLot].filter(_.id == lift(id))
        product <- query[Product].join(_.id == lot.productId)
      } yield (lot,product)
    }
    ctx.run(q).headOption

  override def updateLot(lot: ProductLot): ProductLot = 
    ctx.run(
      query[ProductLot]
      .filter(_.id == lift(lot.id))
      .updateValue(lift(lot))
      .returning(r => r)
    )

  override def getTotalAmountOfLotsAtProduct(productId: Long): Long = 
    ctx.run(
      query[ProductLot]
      .filter(_.productId == lift(productId))
      .size
    )

  override def getLotInventory(id:Long): Option[(ProductLot, Product, CategoryProduct, Location)] =
    val q = quote {
      for {
        lot <- query[ProductLot].filter(_.id == lift(id))
        product <- query[Product].join(_.id == lot.productId)
        category <- query[CategoryProduct].join(_.id == product.categoryProductId)
        location <- query[Location].join(_.id == product.locationId)
      } yield (lot,product,category, location)
    }
    ctx.run(q).headOption
