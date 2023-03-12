package locations.application.remove_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository

class RemoveLocationUseCase()(using locationRepository: LocationRepository) extends BaseUseCase[RequestRemoveLocation, ResponseRemoveLocation]:

  override def execute(request: RequestRemoveLocation): Option[ResponseRemoveLocation] =
    locationRepository.removeLocation(request.id) 
    Some(ResponseRemoveLocation(data= "Removed"))
