package product_lots.application.get_lots

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository
import zio.ZIO

class GetLotsUseCase()(
  using productLotRepository:ProductLotRepository
) extends BaseUseCase[RequestGetLots, ResponseGetLots]:

  override def execute(request: RequestGetLots) = 
    ZIO.succeed(
      for 
        products <- ZIO.succeed(productLotRepository.getLots(request.from, request.to, request.search))
        total <- ZIO.succeed(productLotRepository.getTotalAmountOfLots())
      yield(
        ResponseGetLots(
          data = products
            .map(d => ProductLotInformation(d(0), d(1), d(3), d(2))),
          request = request,
          total = total)
      )
    ).flatten
