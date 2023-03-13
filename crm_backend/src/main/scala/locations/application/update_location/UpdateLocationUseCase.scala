package locations.application.update_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository
import locations.domain.entity.Location

class UpdateLocationUseCase(val locationId:Long)(using locationRepository: LocationRepository) extends BaseUseCase[RequestUpdateLocation, ResponseUpdateLocation]:

  override def execute(request: RequestUpdateLocation): Option[ResponseUpdateLocation] = 
    locationRepository.updateLocation(
      Location(locationId, request.name, request.description, request.img_url)
    ) 
    Some(
      ResponseUpdateLocation("Updated")
    )


