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
      for
        userAgent <- ZIO.succeed(agentRepository.getAgent(request.user.agentId))
        roles <- ZIO.succeed(authorizationRepository.getRolesOfUser(request.user.id))
      yield (
        ResponseGetSessionInformation (
          name = userAgent match {
            case None => ""
            case Some(value) => value.name
          },
          lastname = userAgent match {
            case None => ""
            case Some(value) => value.lastName
          },
          username = request.user.username,
          permissions = request.permission.permissions,
          roles = roles
        )
      )
    }.flatten
