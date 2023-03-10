import zio._
import zio.http._
import zio.http.model.Method

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.PublicEndpoint
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.swagger.bundle.SwaggerInterpreter
import sttp.tapir.ztapir.ZServerEndpoint
import sttp.tapir.json.circe._

import category_products.infrastructure.controller.CategoryProductController
import products.infrastructure.controller.ProductController
import locations.infrastructure.controller.LocationController
import java.io.IOException
import sttp.tapir.Endpoint
import shared.mapper.endpoints.Exposer
import shared.mapper.open_api.OpenAPIGenerator


object Main extends ZIOAppDefault with DI:

  CategoryProductController()
  ProductController()
  LocationController()
    
  val routes: HttpApp[Any, Throwable] = 
    ZioHttpInterpreter()
    .toHttp(
      Exposer.availableEndpoints.toList ++
      OpenAPIGenerator().getDocs()
    )

  override def run: URIO[Any, ExitCode] =
    Server
      .serve(routes.withDefaultErrorResponse)
      .provide(
        ServerConfig.live(ServerConfig.default.port(8080)),
        Server.live
      ).exitCode


