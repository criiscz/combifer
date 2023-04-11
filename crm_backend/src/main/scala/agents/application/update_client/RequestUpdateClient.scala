package agents.application.update_client

case class RequestUpdateClient (
  document: Long, 
  documentType: String,
  personType: String,
  name: String,
  lastName: String,
  phone: String,
  email: String
)
