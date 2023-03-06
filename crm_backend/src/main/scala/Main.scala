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
import shared.BaseController
import java.io.IOException
import sttp.tapir.Endpoint


object Main extends ZIOAppDefault with DI:

  val controllers = List(
    CategoryProductController(),
    ProductController()
  )

  val swaggerEndpoints: List[ZServerEndpoint[Any, Any]] = SwaggerInterpreter().fromEndpoints[Task](controllers.map(_.routes()).flatten, "Combifer", "1.0")

  val routes: HttpApp[Any, Throwable] = 
    ZioHttpInterpreter()
    .toHttp(
      controllers
        .map(_.endpoints()) 
        .flatten ++
      swaggerEndpoints 
    )
  override def run: URIO[Any, ExitCode] =
    Server
      .serve(routes.withDefaultErrorResponse)
      .provide(
        ServerConfig.live(ServerConfig.default.port(8080)),
        Server.live
      ).exitCode


