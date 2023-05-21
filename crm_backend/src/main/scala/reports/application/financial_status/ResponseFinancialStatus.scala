package reports.application.financial_status

case class ResponseFinancialStatus (
  incomes: Incomes,
  outcomes: Outcomes
)

case class Incomes(
  daily: Option[Double],
  monthly: Option[Double],
  annually: Option[Double],
  net: Double
)

case class Outcomes(
  daily: Option[Double],
  monthly: Option[Double],
  annually: Option[Double],
  net: Double
)
