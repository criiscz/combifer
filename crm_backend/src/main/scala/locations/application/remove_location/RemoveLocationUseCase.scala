package locations.application.remove_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository
import products.domain.repository.ProductRepository
import zio.ZIO

class RemoveLocationUseCase()
(using locationRepository: LocationRepository, productRepository: ProductRepository)  
extends BaseUseCase[RequestRemoveLocation, ResponseRemoveLocation]:

  override def execute(request: RequestRemoveLocation) =
    val amountOfProductsInLocation = productRepository.getProductsWithLocation(request.id).size
    if(amountOfProductsInLocation > 0)
      ZIO.fail(new Throwable())
    val location = locationRepository.removeLocation(request.id) 
    ZIO.succeed(ResponseRemoveLocation(location))
