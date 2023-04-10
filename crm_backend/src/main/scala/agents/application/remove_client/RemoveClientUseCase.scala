package agents.application.remove_client

import shared.application.BaseUseCase
import zio._
import agents.domain.repository.AgentRepository

class RemoveClientUseCase 
(using agentRepository:AgentRepository)
extends BaseUseCase[RequestRemoveClient, ResponseRemoveClient]:

  override def execute(request: RequestRemoveClient): Task[ResponseRemoveClient] = 
    ZIO.succeed {
      agentRepository.removeAgent(request.clientId)
    }.map(ResponseRemoveClient.apply)
