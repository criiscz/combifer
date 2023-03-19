package product_lots.application.remove_lot

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository

class RemoveLotUseCase()(
  using productLotRepository:ProductLotRepository,
) extends BaseUseCase[RequestRemoveLot, ResponseRemoveLot]:

  override def execute(request: RequestRemoveLot): Option[ResponseRemoveLot] = 
    val removedLot = productLotRepository.removeLot(request.id)
    Some(
      ResponseRemoveLot(
        removedLot
      )
    )
