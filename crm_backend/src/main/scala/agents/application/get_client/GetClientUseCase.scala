package agents.application.get_client

import shared.application.BaseUseCase
import zio._
import agents.domain.repository.AgentRepository

class GetClientUseCase 
(using agentRepository:AgentRepository)
extends BaseUseCase[RequestGetClient, ResponseGetClient]:

  override def execute(request: RequestGetClient): Task[ResponseGetClient] =
    ZIO.succeed {
      agentRepository.getAgent(request.clientId) match
        case Some(value) => ZIO.succeed(ResponseGetClient(value))
        case None => ZIO.fail(new Throwable("Can't find client"))
    }.flatten
