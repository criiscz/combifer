package locations.application.remove_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository
import products.domain.repository.ProductRepository

class RemoveLocationUseCase()(using locationRepository: LocationRepository, productRepository: ProductRepository) extends BaseUseCase[RequestRemoveLocation, ResponseRemoveLocation]:

  override def execute(request: RequestRemoveLocation): Option[ResponseRemoveLocation] =
    val amountOfProductsInLocation = productRepository.getProductsWithLocation(request.id).size
    if(amountOfProductsInLocation > 0)
      return Some(ResponseRemoveLocation(data = "Can't remove location because it have products"))
    locationRepository.removeLocation(request.id) 
    Some(ResponseRemoveLocation(data= "Removed"))
