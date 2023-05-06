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
import orders.domain.entity.Order
import order_products.domain.entity.OrderProduct

class ReportRepositoryImpl extends ReportRepository with BaseRepository:

  import ctx._

  override def getMostSoldProducts(startDate: LocalDate, endDate: LocalDate, amountOfProducts: Int): List[SoldProductInformation] =
    val q = quote {
      for
        data <- query[Sale].join(query[SaleProduct]).on(_.id == _.saleId)
          .join(query[ProductLot]).on({ case((s, sp), pl) => sp.productLotId == pl.id} )
          .join(query[Product]).on({ case((sp, pl), p) => pl.productId == p.id })
          .filter { data =>
            val (((sale, saleProduct), productLot), product) = data
            infix"${sale.creationDate} > ${lift(startDate)}".as[Boolean] &&
            infix"${sale.creationDate} < ${lift(endDate)}".as[Boolean]
          }
          .groupBy {
            case (((sale, saleProduct), productLot), product) => product
          }
          .map {
            case (product, data) => (product, data.size)
          }
          .sortBy(_._2)(Ord.desc)
          .take(lift(amountOfProducts))
      yield (data)
    }
    ctx.run(q)
      .map(productData =>
        SoldProductInformation(
          productData._1,
          productData._2
        )
      )

  override def getOrderProducts(startDate:LocalDate, endDate:LocalDate): List[OrderProduct] =
    val q = quote {
      for
        data <- query[Order]
          .join(query[OrderProduct]).on(_.id == _.orderId)
          .filter { data =>
            val (order, product) = data
            infix"${order.createDate} > ${lift(startDate)}".as[Boolean] &&
            infix"${order.createDate} < ${lift(endDate)}".as[Boolean]
          }
      yield(data)
    }
    ctx.run(q).map(_._2)
