package locations.infrastructure.controller

import locations.application.create_location._
import locations.domain.repository.LocationRepository

import shared.BaseController
import io.circe.generic.auto.*
import sttp.tapir.generic.auto.*
import sttp.tapir.PublicEndpoint
import sttp.tapir.ztapir.*
import sttp.tapir.json.circe.*
import shared.BaseController
import shared.responses.ErrorResponse
import zio.*

class LocationController()(using locationRepository:LocationRepository) extends  BaseController:

  override def endpoints() = List(createLocationRoute)
  override def routes() = List(createLocation)

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


