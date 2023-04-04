package sale_products.infrastructure.repository

import io.getquill._

import products.domain.entity.Product
import sale_products.domain.repository.SaleProductRepository
import shared.BaseRepository
import sale_products.domain.entity.SaleProduct
import product_lots.domain.entity.ProductLot

class SaleProductRepositoryImpl extends SaleProductRepository with BaseRepository:

  import ctx._

  override def getSoldProductsOfLot(lotId: Long, from: Int, to:Int): List[SaleProduct] =
    val q = quote {
      for 
        lots <- query[ProductLot].filter(_.id == lift(lotId))
        soldProducts <- 
          query[SaleProduct]
            .join(_.productLotId == lots.id)
            .take(lift(to))
            .drop(lift(from))
      yield (soldProducts)
    }
    ctx.run(q)

  override def getSoldProductsOfProduct(productId: Long, from: Int, to: Int): List[SaleProduct] =
    val q = quote {
      for 
        lots <- query[ProductLot].filter(_.productId == lift(productId))
        soldProducts <- 
          query[SaleProduct]
            .join(_.productLotId == lots.id)
            .take(lift(to))
            .drop(lift(from))
      yield (soldProducts)
    }
    ctx.run(q)

  override def getSoldProductsOfSale(saleId: Long, from: Int, to: Int): List[SaleProduct] = 
    ctx.run(
      query[SaleProduct]
        .filter(_.saleId == lift(saleId))
        .take(lift(to))
        .drop(lift(from))
    )

  override def insertSaleProduct(saleProduct: SaleProduct): SaleProduct = 
    ctx.run(
      query[SaleProduct]
        .insertValue(lift(saleProduct))
        .returning(r => r)
    )

  override def updateSaleProduct(saleProduct: SaleProduct): SaleProduct = 
    ctx.run(
      query[SaleProduct]
        .filter(_.id == lift(saleProduct.id))
        .updateValue(lift(saleProduct))
        .returning(r => r)
    )

