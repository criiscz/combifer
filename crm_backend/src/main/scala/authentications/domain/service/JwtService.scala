package authentications.domain.service

import authentications.domain.entity._
import scala.util.Try
import authorizations.domain.entity.PermissionContext

trait JwtService:
  def encodeUserInfo(tokenInfor:TokenInfo): (String, Int)
  def decodeUserInfo(token: AuthenticationToken): Try[(UserContext, PermissionContext)]
