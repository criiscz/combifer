package sales.application.get_sale

import shared.application.BaseUseCase
import zio._
import sales.domain.repository.SaleRepository

class GetSaleUseCase
(using saleRepository: SaleRepository)
extends BaseUseCase[RequestGetSale, ResponseGetSale]:

  override def execute(request: RequestGetSale): Task[ResponseGetSale] =
    ZIO.succeed {
      saleRepository.getSale(request.saleId) match
        case None => ZIO.fail(new Throwable("Can't find sale"))
        case Some(data) => ZIO.succeed(
          ResponseGetSale(
            sale = data(0),
            employee = data(1),
            client = data(2)
          )
        )
    }.flatten
