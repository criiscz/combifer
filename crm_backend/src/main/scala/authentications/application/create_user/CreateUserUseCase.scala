package authentications.application.create_user

import shared.application.BaseUseCase
import authentications.domain.repository.AuthenticationRepository
import authentications.domain.entity.User
import agents.domain.repository.AgentRepository
import agents.domain.entity.Agent
import authentications.domain.service.HashService
import zio.ZIO

class CreateUserUseCase()
(using 
  authenticationRepository:AuthenticationRepository, 
  agentRepository: AgentRepository,
  hashService: HashService
) 
extends BaseUseCase[RequestCreateUser,ResponseCreateUser]:

  override def execute(request: RequestCreateUser) = 
    val encryptedPassword = hashService.hashPassword(request.password) match
      case None => return ZIO.fail(new Throwable())
      case Some(value) => value
    
    val agent = agentRepository.insertAgent(
      Agent(
        idDocument = request.document, 
        documentType = request.documentType,
        personType = "NATURAL",
        name = request.name,
        lastName = request.lastName,
        phone = request.phone,
        email = request.email
      )
    )
    val user = authenticationRepository.createUser(
      User (
        username = request.userName,
        password = encryptedPassword,
        description = None,
        agentId = agent.idDocument
      )
    )
    ZIO.succeed(
      ResponseCreateUser(
        username = user.username,
        document = agent.idDocument,
        email = agent.email
      )
    )
  end execute
