package agents.application.update_client

import shared.application.BaseUseCase
import zio._
import agents.domain.repository.AgentRepository
import agents.domain.entity.Agent

class UpdateClientUseCase(agentId: Long)
(using agentRepository:AgentRepository)
extends BaseUseCase[RequestUpdateClient, ResponseUpdateClient]:

  override def execute(request: RequestUpdateClient): Task[ResponseUpdateClient] = 
    ZIO.succeed {
      agentRepository.updateAgent(
        Agent (
          idDocument = request.document, 
          documentType = request.documentType,
          personType = request.personType,
          name = request.name,
          lastName = request.lastName,
          phone = request.phone,
          email = request.email
        )
      ) 
    }.map(ResponseUpdateClient(_))
