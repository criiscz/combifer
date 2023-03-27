package locations.application.update_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository
import locations.domain.entity.Location
import zio.ZIO

class UpdateLocationUseCase(locationId:Long)
(using locationRepository: LocationRepository)
extends BaseUseCase[RequestUpdateLocation, ResponseUpdateLocation]:

  override def execute(request: RequestUpdateLocation) = 
    val updated = locationRepository.updateLocation(
      Location(locationId, request.name, request.description, request.img_url)
    ) 
    ZIO.succeed(
      ResponseUpdateLocation(updated)
    )
