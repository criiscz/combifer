package authentications.domain.service

import authentications.domain.entity._
import scala.util.Try

trait JwtService:
  def encodeUserInfo(tokenInfor:UserContext): (String, Int)
  def decodeUserInfo(token: AuthenticationToken): Try[UserContext]
