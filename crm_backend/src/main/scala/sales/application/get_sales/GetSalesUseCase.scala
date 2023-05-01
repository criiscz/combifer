package sales.application.get_sales

import shared.application.BaseUseCase
import zio._
import sales.domain.repository.SaleRepository

class GetSalesUseCase
(using saleRepository: SaleRepository)
extends BaseUseCase[RequestGetSales, ResponseGetSales]:

  override def execute(request: RequestGetSales): Task[ResponseGetSales] =
    for
      sales <- ZIO.succeed(saleRepository.getSales(request.from, request.to))
      totalSales <- ZIO.succeed(saleRepository.getTotalAmountOfSales())
    yield(
      ResponseGetSales(
        data = sales,
        request = request,
        total = totalSales
      )
    )
