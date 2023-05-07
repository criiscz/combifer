package reports.application.orders_bought

import shared.application.BaseUseCase
import zio._
import reports.domain.repository.ReportRepository

class OrdersBoughtUseCase
(using reportRepository: ReportRepository)
extends BaseUseCase[RequestOrdersBought, ResponseOrdersBought]:

  override def execute(request: RequestOrdersBought): Task[ResponseOrdersBought] =
    ZIO.succeed {
      ResponseOrdersBought(
        data = reportRepository.getOrderProducts(request.startDate, request.endDate)
      )
    }
