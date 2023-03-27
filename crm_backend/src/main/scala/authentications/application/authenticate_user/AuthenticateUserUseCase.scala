package authentications.application.authenticate_user

import zio._
import scala.util._

import authentications.domain.error.AuthenticationError
import authentications.domain.entity._
import authentications.domain.service.JwtService
import shared.application.BaseUseCase

class AuthenticateUserUseCase() (using jwtService: JwtService) extends BaseUseCase[RequestAuthenticate, ResponseAuthenticate]:

  override def execute(request: RequestAuthenticate) =
    jwtService.decodeUserInfo(request.token) match
      case Failure(exception) => ZIO.fail(exception)
      case Success(tokenInfo) => 
        ZIO.succeed(ResponseAuthenticate(
          userContext = tokenInfo._1,
          permissionContext = tokenInfo._2
        ))
