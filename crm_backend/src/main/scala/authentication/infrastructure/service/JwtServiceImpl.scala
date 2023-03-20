package authentication.infrastructure.service

import authentication.domain.service.JwtService
import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}
import java.time.Clock

class JwtServiceImpl extends JwtService:

  infix val SECRET_KEY = "ArrozConLeche:3"
  infix val ALGORITHM = JwtAlgorithm.HS256
  infix val VALID_TIME_DAYS = 2

  implicit val clock: Clock = Clock.systemUTC

  override def encodeUserInfo(username: String, userId:Long): String =
    val content  = s"""{"id": "${userId}", "user": "${username}"}"""
    val claim = 
      JwtClaim { content }
      .issuedNow
      .expiresIn(VALID_TIME_DAYS * 86400)
    Jwt.encode(claim, SECRET_KEY, ALGORITHM)
