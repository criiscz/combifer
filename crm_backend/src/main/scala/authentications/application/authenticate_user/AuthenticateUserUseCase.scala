package authentications.application.authenticate_user

import zio._
import scala.util._

import authentications.domain.error.AuthenticationError
import authentications.domain.entity._
import authentications.domain.service.JwtService
import shared.application.BaseUseCase

class AuthenticateUserUseCase() (using jwtService: JwtService) extends BaseUseCase[RequestAuthenticate, ResponseAuthenticate]:

  override def execute(request: RequestAuthenticate): Option[ResponseAuthenticate] =
      Some(jwtService.decodeUserInfo(request.token) match
        case Failure(_) => None
        case Success(tokenInfo) => Some(
          ResponseAuthenticate(
            userContext = tokenInfo._1,
            permissionContext = tokenInfo._2
          )
        )
      ).flatten
