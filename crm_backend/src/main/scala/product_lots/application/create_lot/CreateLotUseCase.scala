package product_lots.application.create_lot

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository
import product_lots.domain.entity.ProductLot

class CreateLotUseCase() (using productLotRepository: ProductLotRepository) extends BaseUseCase[RequestCreateLot, ResponseCreateLot]:

  override def execute(request: RequestCreateLot): Option[ResponseCreateLot] = 
    val response = productLotRepository.insertLot(
      ProductLot(
        price = request.price,
        enterDate = request.enterDate,
        emptynessDate = request.emptynessDate,
        quantity = request.quantity.getOrElse(0),
        productId = request.productId
      ))
    Some(
      ResponseCreateLot(data = response)
    )

