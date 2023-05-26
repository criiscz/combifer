package reports.application.sales_sold

import sale_products.domain.entity.SaleProduct
import java.time.LocalDate

case class ResponseSalesSold(
  data: List[SaleProductInformation],
)

case class SaleProductInformation(
  product: SaleProduct,
  soldDate: LocalDate
)
