package authentications.application.create_user

case class RequestCreateUser (
  document: Long,
  documentType: String,
  name: String,
  lastName: String,
  phone: String,
  email: String,
  userName: String,
  password: String
)
