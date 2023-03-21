package authentications.application.login_user

import shared.application.BaseUseCase
import authentications.domain.service.JwtService
import authentications.domain.repository.AuthenticationRepository

class LoginUserUseCase()
(using jwtService: JwtService, authenticationRepository:AuthenticationRepository) 
extends BaseUseCase[RequestLoginUser, ResponseLoginUser]:

  override def execute(request: RequestLoginUser): Option[ResponseLoginUser] = 
    val data = jwtService.encodeUserInfo("UsernamePro", 123)
    Some(
      ResponseLoginUser(data)
    )
