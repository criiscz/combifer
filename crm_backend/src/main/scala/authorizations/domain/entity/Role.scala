package authorizations.domain.entity

case class Role (
  id: Long,
  name: String,
  description: Option[String]
)
