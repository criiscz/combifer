package reports.application.financial_status

import shared.application.BaseUseCase
import zio._
import reports.domain.repository.ReportRepository
import java.time.LocalDate
import java.time.Period

import reports.application.financial_status.TimeOptionExtension.getIncomeOrNone
import reports.application.financial_status.TimeOptionExtension.getOutcomeOrNone
import java.time.temporal.ChronoUnit

class FinancialStatusUseCase
(using reportRepository: ReportRepository)
extends BaseUseCase[RequestFinancialStatus, ResponseFinancialStatus]:

  override def execute(request: RequestFinancialStatus): Task[ResponseFinancialStatus] =
    ZIO.attempt {
      (for
          outcome <- ZIO.fromOption(reportRepository.getTotalOutcomeBetween(request.startDate, request.endDate)).mapError(e => Throwable("Outcome calculation error"))
          income <- ZIO.fromOption(reportRepository.getTotalIncomeBetween(request.startDate, request.endDate)).mapError(e => Throwable("Income calculation error"))
          _ <- ZIO.log("Calculating financial status report")
        yield(
          calculateIncomeAndOutcome(request.startDate, request.endDate, income, outcome)
        )
      )
    } .flatten

  private def calculateIncomeAndOutcome(startDate:LocalDate, endDate:LocalDate, totalIncome: Double, totalOutcome: Double): ResponseFinancialStatus =
    val days = ChronoUnit.DAYS.between(startDate, endDate)
    val months = ChronoUnit.MONTHS.between(startDate, endDate)
    val years = ChronoUnit.YEARS.between(startDate, endDate)

    val daily = days match {
      case days if(days <= 0) => None
      case days => Some((totalIncome / days), (totalOutcome / days))
    }
    val monthly = months match {
      case months if(months <= 0) => None
      case months => Some((totalIncome / months), (totalOutcome / months))
    }
    val anually = years match {
      case years if(years <= 0) => None
      case years => Some((totalIncome / years), (totalOutcome / years))
    }

    ResponseFinancialStatus(
      Incomes (
        annually = anually.getIncomeOrNone(),
        monthly = monthly.getIncomeOrNone(),
        daily = daily.getIncomeOrNone(),
        net = totalIncome
      ),
      Outcomes (
        annually = anually.getOutcomeOrNone(),
        monthly = monthly.getOutcomeOrNone(),
        daily = daily.getOutcomeOrNone(),
        net = totalOutcome
      )
    )

object TimeOptionExtension{
  extension(timeOption: Option[(Double, Double)]){
    def getIncomeOrNone(): Option[Double] = timeOption match
      case None => None
      case Some(value) => Some(value._1)
    def getOutcomeOrNone(): Option[Double] = timeOption match
      case None => None
      case Some(value) => Some(value._2)
  }
}
