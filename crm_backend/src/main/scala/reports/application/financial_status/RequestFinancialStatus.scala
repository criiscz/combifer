package reports.application.financial_status

import java.time.LocalDate

case class RequestFinancialStatus(
  startDate: LocalDate,
  endDate: LocalDate,
)
