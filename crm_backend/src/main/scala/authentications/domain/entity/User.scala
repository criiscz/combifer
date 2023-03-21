package authentications.domain.entity

case class User (
  id:Long,
  username: String,
  password: String,
  description: Option[String],
  agentId: Long
)
