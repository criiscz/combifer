package authentications.application.authenticate_user

import zio._
import scala.util._

import authentications.domain.error.AuthenticationError
import authentications.domain.entity._
import authentications.domain.service.JwtService

class AuthenticateUserUseCase()
(using jwtService: JwtService):

  def authenticate(token: AuthenticationToken): IO[AuthenticationError, UserContext] =
    ZIO.succeed {
      jwtService.decodeUserInfo(token) match
        case Failure(_) => 
          ZIO.fail(AuthenticationError(code = 1001))
        case Success(value) => 
          ZIO.succeed(value)
    }.flatten
