package shared.interceptors

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import sttp.tapir.server.model.ValuedEndpointOutput

import shared.responses.ErrorResponse
import sttp.tapir.server.interceptor.exception._
import sttp.model.StatusCode
import scala.concurrent.Future
import org.postgresql.util.PSQLException

object ErrorHandling:

  val exceptionHandler: ExceptionHandler[({ type Alias[A] = zio.RIO[Any, A] })#Alias] =
    ExceptionHandler[({ type Alias[A] = zio.RIO[Any, A] })#Alias](ctx =>
      exceptionResponse(ctx)
    )

  private def exceptionResponse(ctx: ExceptionContext) = ZIO.some(
    ValuedEndpointOutput(
      jsonBody[ErrorResponse].and(statusCode),
      (
        resolveExceptionType(ctx),
        StatusCode.InternalServerError
      )
    )
  )

  private def resolveExceptionType(ctx: ExceptionContext):ErrorResponse = 
    val message = ctx.e.getMessage().replace("\"", "")
    ctx.e match
      case exception :PSQLException => ErrorResponse(
        error = "Database operation exception!",
        message = message.split("Detail:").lastOption.getOrElse(message),
        detail = Some("Usuallly this happens due a violatio of the schema in the Database, check your FK and IDs")
        )
      case _: Throwable => ErrorResponse(
        message = "We have problems handling your request"
      )
