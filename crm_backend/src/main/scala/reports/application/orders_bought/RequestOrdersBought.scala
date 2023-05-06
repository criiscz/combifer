package reports.application.orders_bought

import java.time.LocalDate

case class RequestOrdersBought (
  startDate: LocalDate,
  endDate: LocalDate
)
