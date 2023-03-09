package locations.application.get_locations

import locations.domain.repository.LocationRepository
import  locations.application.get_locations.ResponseGetLocations
import shared.application.BaseUseCase

class GetLocationsUseCase()(using locationRepository: LocationRepository) extends BaseUseCase[RequestGetLocations, ResponseGetLocations]:
  override def execute(request: RequestGetLocations): Option[ResponseGetLocations] =
    return Some(
      ResponseGetLocations(
        data = locationRepository.getLocations(request.page,request.perPage),
        request = request,
        total = locationRepository.getTotalAmountOfLocations()
      )
    )
