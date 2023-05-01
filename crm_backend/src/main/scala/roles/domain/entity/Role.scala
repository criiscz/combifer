package roles.domain.entity

case class Role (
  id: Long = -1,
  name: String,
  description: Option[String]
)
