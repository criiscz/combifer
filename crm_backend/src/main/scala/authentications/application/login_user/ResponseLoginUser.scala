package authentications.application.login_user

case class ResponseLoginUser (
  accessToken: String,
  expiresIn: Int,
  tokenType: String = "Bearer"
)
