package roles.application.create_role

case class RequestCreateRole (
  name: String,
  description: Option[String]
)
