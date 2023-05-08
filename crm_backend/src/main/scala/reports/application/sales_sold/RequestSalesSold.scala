package reports.application.sales_sold

import java.time.LocalDate

case class RequestSalesSold (
  startDate: LocalDate,
  endDate: LocalDate
)
