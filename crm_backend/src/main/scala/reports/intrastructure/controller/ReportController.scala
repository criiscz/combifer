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
import reports.application.orders_bought._
import reports.application.financial_status._

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
    .in(routeName / "most-sold-products")
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

  private val getProductsOrder =
    endpoint
    .in(routeName / "order-bought-products")
    .in(
      query[LocalDate]("start_date")
        .and(query[LocalDate]("end_date"))
    )
    .get
    .out(jsonBody[ResponseOrdersBought])
    .expose

  private val getProductsOrderRoute =
    getProductsOrder.zServerLogic {(startDate: LocalDate, endDate: LocalDate) =>
      OrdersBoughtUseCase().execute(
        RequestOrdersBought(
          startDate,
          endDate
        )
      ).mapError(e => ErrorResponse(message = "Can't generate report"))
    }.expose

  private val getFinancialReport =
    endpoint
    .in(routeName / "financial-report")
    .in(
      query[LocalDate]("start_date")
        .and(query[LocalDate]("end_date"))
    )
    .get
    .out(jsonBody[ResponseFinancialStatus])
    .expose

  private val getFinancialReportRoute =
    getFinancialReport.zServerLogic {(startDate: LocalDate, endDate: LocalDate) =>
      FinancialStatusUseCase().execute(
        RequestFinancialStatus(
          startDate,
          endDate
        )
      ).mapError(e => ErrorResponse(message = "Can't generate report"))
    }.expose
