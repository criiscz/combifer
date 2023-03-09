package shared.responses

case class ErrorResponse(
  error: String = "Something goes wrong!",
  message: String,
  detail: Option[String] = None
)
