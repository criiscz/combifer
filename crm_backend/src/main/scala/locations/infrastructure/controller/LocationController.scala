package locations.infrastructure.controller

import locations.application.create_location.*
import locations.domain.repository.LocationRepository
import locations.application.get_locations.{RequestGetLocations, ResponseGetLocations, GetLocationsUseCase}
import locations.domain.entity.Location

import io.circe.generic.auto.*

import sttp.tapir.generic.auto.*
import sttp.tapir.PublicEndpoint
import sttp.tapir.ztapir.*
import sttp.tapir.json.circe.*

import shared.BaseController
import shared.responses.{ErrorResponse, PaginatedResponse}
import zio._

class LocationController()(using locationRepository:LocationRepository) extends  BaseController:

  override def endpoints() = List(createLocationRoute, getAllLocationsRoute)
  override def routes() = List(createLocation, getAllLocations)

  private val createLocation: PublicEndpoint[RequestCreateLocation, ErrorResponse, ResponseCreateLocation, Any] =
    endpoint
      .in("location-products")
      .post
      .in(jsonBody[RequestCreateLocation])
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseCreateLocation])

  private val createLocationRoute: ZServerEndpoint[Any, Any] = createLocation.zServerLogic{request =>
    val response = CreateLocationUseCase().execute(request)
    ZIO.succeed(response.get)
  }

  private val getAllLocations:PublicEndpoint[(Int, Int), String, PaginatedResponse[Location], Any] =
    endpoint
      .in("locations-products")
      .get
      .in(
        query[Int]("page").and(query[Int]("per_page"))
      )
      .errorOut(stringBody)
      .out(jsonBody[PaginatedResponse[Location]])

  private val getAllLocationsRoute: ZServerEndpoint[Any,Any] = getAllLocations.zServerLogic{params =>
    val response = GetLocationsUseCase().execute(
      RequestGetLocations(
        params._1,
        params._2
      )
    )
    ZIO.succeed(response.get)
  }