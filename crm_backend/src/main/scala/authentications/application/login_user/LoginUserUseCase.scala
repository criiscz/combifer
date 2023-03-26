package authentications.application.login_user

import shared.application.BaseUseCase
import authentications.domain.service.JwtService
import authentications.domain.repository.AuthenticationRepository
import authentications.domain.service.HashService
import authentications.domain.entity.TokenInfo

import authorizations.domain.repository.AuthorizationRepository

class LoginUserUseCase()
(using 
  jwtService: JwtService, 
  authenticationRepository:AuthenticationRepository,
  authorizationRepository: AuthorizationRepository,
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
    
    val userContext = 
      hashService.areSamePassword(
        plainPassword = request.password,
        bcryptedPassword = user.password
      ) match
          case true => 
            user.getTokenInfo()
          case false => 
            return None

    val permissionContext = 
      authorizationRepository
        .getPermissionContextOfUser(userContext.id)

    val (token, expirationTime) = 
      jwtService.encodeUserInfo(
        TokenInfo(
          userContext,
          permissionContext
        )
      )
    Some(
      ResponseLoginUser(
        accessToken = token,
        expiresIn = expirationTime
      )
    )
  end execute
