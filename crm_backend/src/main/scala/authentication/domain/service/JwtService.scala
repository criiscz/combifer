package authentication.domain.service

trait JwtService:
  def encodeUserInfo(username: String, userId:Long): String
