package locations.application.create_location

case class RequestCreateLocation (
  name: String,
  description: Option[String],
  img_url: String
)
