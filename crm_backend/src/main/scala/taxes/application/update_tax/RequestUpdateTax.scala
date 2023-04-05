package taxes.application.update_tax

case class RequestUpdateTax (
  name: String,
  description: Option[String],
  value: Float
)
