package agents.domain.entity

case class Agent (
  id: Long = -1,
  documentType: String,
  personType: String,
  name: String,
  lastName: String,
  phone: String,
  email:String
)
