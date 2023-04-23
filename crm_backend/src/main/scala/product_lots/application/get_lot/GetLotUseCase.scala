package product_lots.application.get_lot

import shared.application.BaseUseCase
import product_lots.domain.repository.ProductLotRepository
import category_products.domain.repository.CategoryProductRepository
import locations.domain.repository.LocationRepository
import products.domain.repository.ProductRepository
import zio.ZIO

class GetLotUseCase() (
  using productLotRepository:ProductLotRepository
) extends BaseUseCase[RequestGetLot, ResponseGetLot]:

  override def execute(request: RequestGetLot) =
    val productLot = 
      productLotRepository.getLotInventory(request.id) match
        case None => return ZIO.fail(new Throwable())
        case Some(value) => value
    ZIO.succeed(
      ResponseGetLot(
        lot = productLot._1,
        product =  productLot._2,
        category = productLot._3,
        location = productLot._4
      )
    )  

