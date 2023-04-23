package agents.application.create_client

import shared.application.BaseUseCase
import zio._
import agents.domain.repository.AgentRepository
import agents.domain.entity.Agent

class CreateClientUseCase
(using agentRepository:AgentRepository)
extends BaseUseCase[RequestCreateClient, ResponseCreateClient]:

  override def execute(request: RequestCreateClient): Task[ResponseCreateClient] = 
    ZIO.succeed {
      agentRepository.insertAgent(
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
    }.map(ResponseCreateClient.apply)
