package product_lots.application.update_lot

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository
import product_lots.domain.entity.ProductLot

class UpdateLotUseCase(productId: Long)(using productLotRepository: ProductLotRepository) extends BaseUseCase[RequestUpdateLot, ResponseUpdateLot]:

  override def execute(request: RequestUpdateLot): Option[ResponseUpdateLot] =
    val updatedLot = productLotRepository.updateLot(
      ProductLot(
        id = productId,
        price = request.price,
        enterDate = request.enterDate,
        emptynessDate = request.emptynessDate,
        quantity =request.quantity,
        productId = request.productId,
      )
    )
    Some(ResponseUpdateLot(updatedLot))
    
