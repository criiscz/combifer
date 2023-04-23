package authentications.application.login_user

case class RequestLoginUser (
  usernameOrEmail: String,
  password: String
)
