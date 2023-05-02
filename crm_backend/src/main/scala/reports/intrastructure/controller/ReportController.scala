package reports.intrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import shared.BaseController
import shared.responses._
import shared.mapper.endpoints.Exposer._
import reports.domain.repository.ReportRepository
import authentications.domain.service.JwtService

import reports.application.most_sold._
import authentications.domain.entity.UserContext
import authorizations.domain.entity.PermissionContext
import java.time.LocalDate

class ReportController
(using
   reportRepository: ReportRepository,
   jwtService: JwtService)
extends BaseController:

  private val routeName = "reports"

  private val getMostSoldProducts =
    endpoint
    .in(routeName + "-most-sold-products")
    .in(
      query[LocalDate]("start_date")
        .and(query[LocalDate]("end_date"))
          .and(query[Int]("products_amount"))
    )
    .get
    .out(jsonBody[ResponseMostSold])
    .expose

  private val getMostSoldProductsRoute =
    getMostSoldProducts.zServerLogic {
      (startDate: LocalDate, endDate: LocalDate, productsAmount: Int) =>
      MostSoldUseCase().execute(
        RequestMostSold(
          startDate,
          endDate,
          productsAmount
        )
      ).mapError(e => ErrorResponse(message = "Can't generate report"))
    }.expose
