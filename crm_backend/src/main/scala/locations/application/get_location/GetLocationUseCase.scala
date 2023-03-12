package locations.application.get_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository

class GetLocationUseCase() (using locationRepository: LocationRepository) extends BaseUseCase[RequestGetLocation, ResponseGetLocation]:

  override def execute(request: RequestGetLocation): Option[ResponseGetLocation] = 
    locationRepository.getLocation(request.id) match {
      case Some(value) => Some(ResponseGetLocation(value))
      case None => None
    }

