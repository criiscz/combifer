package authentications.domain.error

sealed case class AuthenticationError(
  error: String = "Authentication Error",
  message: String = "Can't authenticate user properly",
  code:Int
)
