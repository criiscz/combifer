package authentications.domain.error

import shared.responses.ApplicationError

sealed case class AuthenticationError(
  error: String = "Authentication Error",
  message: String = "Can't authenticate user properly",
  code:Int
) extends ApplicationError
