package locations.domain.entity

case class Location(
   id: Long = -1,
   name: String,
   description: Option[String],
   img_url: String
)
