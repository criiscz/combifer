package agents.application.create_client

case class RequestCreateClient (
  document: Long, 
  documentType: String,
  personType: String,
  name: String,
  lastName: String,
  phone: String,
  email: String
)
