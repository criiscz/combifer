package authentications.infrastructure.service

import authentications.domain.service.JwtService
import authentications.domain.entity._
import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}
import java.time.Clock
import scala.util._
import io.circe.syntax._
import io.circe.generic.auto._
import io.circe.parser._
import authorizations.domain.entity.PermissionContext

class JwtServiceImpl extends JwtService:

  val SECRET_KEY = "ArrozConLeche:3"
  val ALGORITHM = JwtAlgorithm.HS256
  val VALID_TIME_DAYS = 2

  implicit val clock: Clock = Clock.systemUTC

  override def encodeUserInfo(tokenInfo: TokenInfo): (String, Int) =
    val content  = tokenInfo.asJson.toString()
    val expireTime = VALID_TIME_DAYS * 86400
    val claim = 
      JwtClaim { content }
      .issuedNow
      .expiresIn(expireTime)
    val token = Jwt.encode(claim, SECRET_KEY, ALGORITHM)
    (token, expireTime)

  override def decodeUserInfo(token: AuthenticationToken): Try[(UserContext, PermissionContext)] = 
    val (_:String, plainTokenInfo:String, _:String) = 
      Jwt.decodeRawAll(token.value, SECRET_KEY, Seq(JwtAlgorithm.HS256)) match
        case Failure(exception) => return Failure(Exception())
        case Success(value) => value
    
    val tokenInfo: TokenInfo = 
      decode[TokenInfo](plainTokenInfo) match
        case Right(value) => value
        case Left(value) => return Failure(value)

    Success(tokenInfo.userContext, tokenInfo.permissionContext)
