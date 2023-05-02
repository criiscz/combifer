package reports.application.most_sold

import java.time.LocalDate

case class RequestMostSold (
  startDate: LocalDate,
  endDate: LocalDate,
  amountOfProducts: Int
)
