package reports.application.sales_sold

import sale_products.domain.entity.SaleProduct

case class ResponseSalesSold(
  data: List[SaleProduct]
)
