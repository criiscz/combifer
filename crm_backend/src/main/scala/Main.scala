import zio._
import zio.http._
import zio.http.model.Method

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.swagger.bundle.SwaggerInterpreter
import sttp.tapir.ztapir.ZServerEndpoint
import sttp.tapir.json.circe._

import category_products.infrastructure.controller.CategoryProductController
import products.infrastructure.controller.ProductController
import locations.infrastructure.controller.LocationController
import product_lots.infrastructure.controller.ProductLotController

import authentications.infrastructure.controller.AuthenticationController
import java.io.IOException
import sttp.tapir.Endpoint
import shared.mapper.endpoints.Exposer
import shared.mapper.open_api.OpenAPIGenerator
import sttp.tapir.server.ziohttp.ZioHttpServerOptions

import shared.interceptors._
import sttp.tapir.server.interceptor.cors.CORSInterceptor
import taxes.infrastructure.controller.TaxController
import sales.infrastructure.controller.SalesController
import recommendations.infrastructure.controller.RecommendationController


object Main extends ZIOAppDefault with DI:

  AuthenticationController()
  CategoryProductController()
  ProductController()
  LocationController()
  ProductLotController()
  TaxController()
  SalesController()
  // RecommendationController()

  val serverOptions:ZioHttpServerOptions[Any] =
    ZioHttpServerOptions
      .customiseInterceptors
      .corsInterceptor(CORSInterceptor.customOrThrow(CorsHandling.config))
      .exceptionHandler(ErrorHandling.exceptionHandler)
      .options

  val routes: HttpApp[Any, Throwable] = 
    ZioHttpInterpreter(serverOptions)
      .toHttp(
        Exposer.availableEndpoints.toList ++ 
        OpenAPIGenerator().getDocs()
      )

  override def run: URIO[Any, ExitCode] =
    Server
      .serve(routes.withDefaultErrorResponse)
      .provide(
        ServerConfig
          .live(ServerConfig.default.port(8090)),
          Server.live
        ).exitCode
  end run
