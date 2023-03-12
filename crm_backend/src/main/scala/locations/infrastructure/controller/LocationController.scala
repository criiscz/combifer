package locations.infrastructure.controller

import locations.domain.repository.LocationRepository
import locations.domain.entity.Location

import io.circe.generic.auto.*

import sttp.tapir.generic.auto.*
import sttp.tapir.PublicEndpoint
import sttp.tapir.ztapir.*
import sttp.tapir.json.circe.*

import shared.mapper.endpoints.Exposer._
import shared.responses._
import zio._
import locations.application.get_location._
import locations.application.get_locations._
import locations.application.create_location._
import locations.application.update_location._
import org.scalameta.adt.none

class LocationController() (using locationRepository:LocationRepository):

  private val createLocation: PublicEndpoint[RequestCreateLocation, ErrorResponse, ResponseCreateLocation, Any] =
    endpoint
      .in("locations")
      .post
      .in(jsonBody[RequestCreateLocation])
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseCreateLocation])
      .expose

  private val createLocationRoute: ZServerEndpoint[Any, Any] = createLocation.zServerLogic{request =>
    CreateLocationUseCase().execute(request) match {
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message = "Can't create Location"))
    }
  }.expose

  private val getAllLocations:PublicEndpoint[(Int, Int), ErrorResponse, PaginatedResponse[Location], Any] =
    endpoint
      .in("locations")
      .get
      .in(
        query[Int]("page").and(query[Int]("per_page"))
      )
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[PaginatedResponse[Location]])
      .expose

  private val getAllLocationsRoute: ZServerEndpoint[Any,Any] = getAllLocations.zServerLogic{params =>
    GetLocationsUseCase().execute(
      RequestGetLocations(
        params._1,
        params._2
      )
    ) match {
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message = "Can't get all locations"))
    }
  }.expose

  private val getLocation: PublicEndpoint[Long, ErrorResponse, ResponseGetLocation, Any] = 
    endpoint
      .in("locations" / path[Long]("id"))
      .get
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseGetLocation])
      .expose

  private val getLocationRoute: ZServerEndpoint[Any,Any] = getLocation.zServerLogic{id =>
    GetLocationUseCase().execute(RequestGetLocation(id)) match {
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message = "Can't find location"))
    }
  }.expose

  private val updateLocation: PublicEndpoint[(Long, RequestUpdateLocation), ErrorResponse, ResponseUpdateLocation, Any] = 
    endpoint
      .in("locations" / path[Long]("id"))
      .put
      .in(jsonBody[RequestUpdateLocation])
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseUpdateLocation])
      .expose
    
  private val updateLocationRoute: ZServerEndpoint[Any,Any] = updateLocation.zServerLogic{(id:Long, data: RequestUpdateLocation) =>
    UpdateLocationUseCase(id).execute(data) match {
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail(ErrorResponse(message = "Can't update location"))
    }
  }.expose
