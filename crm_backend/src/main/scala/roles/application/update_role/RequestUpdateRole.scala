package roles.application.update_role

case class RequestUpdateRole (
  name: String,
  description: Option[String]
)
