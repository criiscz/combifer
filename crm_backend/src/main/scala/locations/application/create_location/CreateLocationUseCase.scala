package locations.application.create_location

import locations.domain.repository.LocationRepository
import locations.domain.entity.Location
import shared.application.BaseUseCase
import zio.ZIO

class CreateLocationUseCase()
(using locationRepository:LocationRepository) 
extends BaseUseCase[RequestCreateLocation, ResponseCreateLocation]:

  override def execute(request: RequestCreateLocation) =
    val location = locationRepository.insertLocation(
      Location(
        name = request.name,
        description = request.description,
        img_url = request.img_url
      )
    )
    ZIO.succeed(
      ResponseCreateLocation(data = location)
    )
