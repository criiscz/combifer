package product_lots.application.get_lots

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository

class GetLotsUseCase()(
  using productLotRepository:ProductLotRepository
) extends BaseUseCase[RequestGetLots, ResponseGetLots]:

  override def execute(request: RequestGetLots): Option[ResponseGetLots] = 
    Some(
      ResponseGetLots(
        data = productLotRepository.getLots(request.page, request.perPage),
        request = request,
        total = productLotRepository.getTotalAmountOfLots()
      )
    )
