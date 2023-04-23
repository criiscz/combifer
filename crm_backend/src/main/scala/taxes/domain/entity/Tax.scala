package taxes.domain.entity

case class Tax (
  id: Long = -1,
  name:String,
  description: Option[String],
  value: Float
)
