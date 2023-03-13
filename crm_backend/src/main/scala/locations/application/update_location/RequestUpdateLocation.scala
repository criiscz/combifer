package locations.application.update_location

case class RequestUpdateLocation(
  name:String,
  description: Option[String],
  img_url:String
)
