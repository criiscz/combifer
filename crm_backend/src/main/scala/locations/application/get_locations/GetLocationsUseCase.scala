package locations.application.get_locations

import locations.domain.repository.LocationRepository
import  locations.application.get_locations.ResponseGetLocations
import shared.application.BaseUseCase
import zio.ZIO

class GetLocationsUseCase()
(using locationRepository: LocationRepository) 
extends BaseUseCase[RequestGetLocations, ResponseGetLocations]:

  override def execute(request: RequestGetLocations) =
    ZIO.succeed(
      ResponseGetLocations(
        data = locationRepository.getLocations(request.page,request.perPage),
        request = request,
        total = locationRepository.getTotalAmountOfLocations()
      )
    )
