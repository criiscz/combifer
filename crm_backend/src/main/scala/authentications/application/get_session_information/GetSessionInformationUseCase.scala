package authentications.application.get_session_information

import shared.application.BaseUseCase
import authentications.domain.service.JwtService
import agents.domain.repository.AgentRepository
import zio._
import authorizations.domain.repository.AuthorizationRepository

class GetSessionInformationUseCase 
(using 
  jwtService: JwtService, 
  agentRepository:AgentRepository,
  authorizationRepository: AuthorizationRepository
  )
extends BaseUseCase[RequestGetSessionInformation, ResponseGetSessionInformation]:

  override def execute(request: RequestGetSessionInformation): Task[ResponseGetSessionInformation] = 
    ZIO.succeed {
      ResponseGetSessionInformation (
        username = request.user.username,
        permissions = request.permission.permissions,
        roles = authorizationRepository.getRolesOfUser(request.user.id)
      )
    }
