package product_lots.application.get_lots

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository
import zio.ZIO

class GetLotsUseCase()(
  using productLotRepository:ProductLotRepository
) extends BaseUseCase[RequestGetLots, ResponseGetLots]:

  override def execute(request: RequestGetLots) = 
    ZIO.succeed(
      ResponseGetLots(
        data = productLotRepository.getLots(request.page, request.perPage),
        request = request,
        total = productLotRepository.getTotalAmountOfLots()
      )
    )
