package agents.infrastructure.repository

import agents.domain.repository.AgentRepository
import agents.domain.entity.Agent
import io.getquill._
import shared.BaseRepository

class AgentRepositoryImpl extends AgentRepository with BaseRepository:

  import ctx._

  override def getAgents(from: Int, to: Int): List[Agent] =
    ctx.run(
      query[Agent]
        .sortBy(_.idDocument)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
    )

  override def removeAgent(id: Long): Agent =
    ctx.run(
      query[Agent]
        .filter(_.idDocument == lift(id))
        .delete
        .returning(r => r)
    )

  override def updateAgent(agent: Agent): Agent = 
    ctx.run(
      query[Agent]
        .filter(_.idDocument == lift(agent.idDocument))
        .updateValue(lift(agent))
        .returning(r => r)
    )

  override def insertAgent(agent: Agent): Agent = 
    ctx.run(
      query[Agent]
        .insertValue(lift(agent))
        .returning(r => r)
    )

  override def getAgent(id: Long): Option[Agent] = 
    ctx.run(
      query[Agent]
      .filter(_.idDocument == lift(id))
    ).headOption

  override def getTotalAmountOfAgents():Long = 
    ctx.run(
      query[Agent].size
    )
