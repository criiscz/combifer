package authentications.domain.service

trait JwtService:
  def encodeUserInfo(username: String, userId:Long): (String, Int)
