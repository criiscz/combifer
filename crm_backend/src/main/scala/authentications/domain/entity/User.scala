package authentications.domain.entity

case class User (
  id:Long = -1,
  username: String,
  password: String,
  description: Option[String],
  agentId: Long
)
