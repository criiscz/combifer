package locations.application.get_locations

import locations.domain.repository.LocationRepository
import shared.application.BaseUseCase

class GetLocationsUseCase()(using locationRepository: LocationRepository) extends BaseUseCase[RequestGetLocations, ResponseGetLocations]:
