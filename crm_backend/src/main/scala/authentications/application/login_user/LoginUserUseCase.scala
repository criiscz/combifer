package authentications.application.login_user

import shared.application.BaseUseCase
import authentications.domain.service.JwtService
import authentications.domain.repository.AuthenticationRepository
import authentications.domain.service.HashService

class LoginUserUseCase()
(using 
  jwtService: JwtService, 
  authenticationRepository:AuthenticationRepository,
  hashService: HashService
) extends BaseUseCase[RequestLoginUser, ResponseLoginUser]:

  override def execute(request: RequestLoginUser): Option[ResponseLoginUser] = 
    val user = 
      authenticationRepository
        .getUserByUsername(request.usernameOrEmail)
        .orElse(
          authenticationRepository.getUserByEmail(request.usernameOrEmail)
        ) match
          case None => return None
          case Some(value) => value
    
    val (token, expirationTime) = 
      hashService.areSamePassword(
        plainPassword = request.password,
        bcryptedPassword = user.password
      ) match
          case true => jwtService.encodeUserInfo(user.username, user.id)
          case false => return None
    Some(
      ResponseLoginUser(
        accessToken = token,
        expiresIn = expirationTime
      )
    )
  end execute
