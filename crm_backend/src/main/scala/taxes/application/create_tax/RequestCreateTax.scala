package taxes.application.create_tax

case class RequestCreateTax (
  name: String,
  description: Option[String],
  value: Float
)
