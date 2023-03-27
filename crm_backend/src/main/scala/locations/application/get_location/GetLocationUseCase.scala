package locations.application.get_location

import shared.application.BaseUseCase
import locations.domain.repository.LocationRepository
import zio.ZIO

class GetLocationUseCase() 
(using locationRepository: LocationRepository)
extends BaseUseCase[RequestGetLocation, ResponseGetLocation]:

  override def execute(request: RequestGetLocation) = 
    locationRepository.getLocation(request.id) match {
      case Some(value) => ZIO.succeed(ResponseGetLocation(value))
      case None => ZIO.fail(new Throwable())
    }

