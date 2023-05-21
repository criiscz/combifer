package reports.application.sales_sold

import shared.application.BaseUseCase
import zio._
import reports.domain.repository.ReportRepository

class SalesSoldUseCase
(using reportRepository: ReportRepository)
extends BaseUseCase[RequestSalesSold, ResponseSalesSold]:

  override def execute(request: RequestSalesSold): Task[ResponseSalesSold] =
    ZIO.attempt {
      ResponseSalesSold(
        data = reportRepository.getSaleProducts(request.startDate, request.endDate)
      )
    }
