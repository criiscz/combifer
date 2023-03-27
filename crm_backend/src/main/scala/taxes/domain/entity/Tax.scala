package taxes.domain.entity

case class Tax (
  id: Long,
  name:String,
  description: Option[String],
  value: Float
)
