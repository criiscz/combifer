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
      for 
        locations <- ZIO.succeed(locationRepository.getLocations(request.from,request.to))
        total <- ZIO.succeed(locationRepository.getTotalAmountOfLocations())
      yield( ResponseGetLocations(data = locations, request = request, total = total) )
    ).flatten
