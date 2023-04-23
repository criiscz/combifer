package locations.application.update_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository
import locations.domain.entity.Location

class UpdateLocationUseCase(locationId:Long)(using locationRepository: LocationRepository) extends BaseUseCase[RequestUpdateLocation, ResponseUpdateLocation]:

  override def execute(request: RequestUpdateLocation): Option[ResponseUpdateLocation] = 
    val updated = locationRepository.updateLocation(
      Location(locationId, request.name, request.description, request.img_url)
    ) 
    Some(
      ResponseUpdateLocation(updated)
    )
