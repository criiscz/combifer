package reports.application.most_sold

import shared.application.BaseUseCase
import zio._
import reports.domain.repository.ReportRepository

class MostSoldUseCase
(using reportRepository: ReportRepository)
extends BaseUseCase[RequestMostSold, ResponseMostSold]:

  override def execute(request: RequestMostSold): Task[ResponseMostSold] =
    ZIO.succeed {
      val mostSoldInfo = reportRepository.getMostSoldProducts(
        request.startDate,
        request.endDate,
        request.amountOfProducts
      )
      ResponseMostSold(
        data = mostSoldInfo
      )
    }
