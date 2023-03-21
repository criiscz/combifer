package agents.domain.entity

case class Agent (
  idDocument: Long,
  documentType: String,
  personType: String,
  name: String,
  lastName: String,
  phone: String,
  email:String
)
