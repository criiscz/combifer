package agents.application.get_clients

import shared.application.BaseUseCase
import zio._
import agents.domain.repository.AgentRepository

class GetClientsUseCase
(using agentRepository:AgentRepository)
extends BaseUseCase[RequestGetClients, ResponseGetClients]:

  override def execute(request: RequestGetClients): Task[ResponseGetClients] = 
    ZIO.succeed {
      for
        data <- ZIO.succeed(agentRepository.getAgents(request.from, request.to))
        total <- ZIO.succeed(agentRepository.getTotalAmountOfAgents())
      yield (ResponseGetClients(data, request, total))
    }.flatten
