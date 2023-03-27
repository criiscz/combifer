package product_lots.application.remove_lot

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository
import zio.ZIO

class RemoveLotUseCase()(
  using productLotRepository:ProductLotRepository,
) extends BaseUseCase[RequestRemoveLot, ResponseRemoveLot]:

  override def execute(request: RequestRemoveLot) = 
    val removedLot = productLotRepository.removeLot(request.id)
    ZIO.succeed(
      ResponseRemoveLot(
        removedLot
      )
    )
