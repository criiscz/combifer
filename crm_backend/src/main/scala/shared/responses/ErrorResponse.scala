package shared.responses

import authentications.domain.error.AuthenticationError

trait ApplicationError

case class ErrorResponse (
  error: String = "Something goes wrong!",
  message: String,
  detail: Option[String] = None
) extends ApplicationError

case class AuthenticationErrorResponse (
  wrapped: AuthenticationError
) extends ApplicationError
