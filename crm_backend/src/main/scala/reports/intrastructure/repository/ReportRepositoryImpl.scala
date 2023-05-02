package reports.intrastructure.repository

import io.getquill._

import shared.BaseRepository
import reports.domain.repository.ReportRepository
import java.time.LocalDate
import reports.domain.entity.SoldProductInformation
import product_lots.domain.entity.ProductLot
import sale_products.domain.entity.SaleProduct
import sales.domain.entity.Sale
import products.domain.entity.Product

class ReportRepositoryImpl extends ReportRepository with BaseRepository:

  import ctx._

  override def getMostSoldProducts(startDate: LocalDate, endDate: LocalDate, amountOfProducts: Int): List[SoldProductInformation] =
    val q = quote {
      for
        sales <- query[Sale]
        saleProduct <- query[SaleProduct].filter(_.saleId == sales.id)
        lots <- query[ProductLot].filter(_.id == saleProduct.productLotId)
        (productId, amount) <- query[Product].filter(_.id == lots.productId)
          .groupBy(_.id)
          .map {
            case (id, product) => (id, product.size)
          }
          .sortBy(_._2)(Ord.desc)
          .take(lift(amountOfProducts))
      yield (lots)
    }
    ctx.run(q).map(product => SoldProductInformation(null))
