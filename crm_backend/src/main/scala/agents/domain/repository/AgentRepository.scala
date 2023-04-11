package agents.domain.repository

import agents.domain.entity.Agent

trait AgentRepository:
  def getAgent(id: Long): Option[Agent]
  def getAgents(from: Int, to: Int): List[Agent]
  def getTotalAmountOfAgents():Long
  def insertAgent(agent:Agent): Agent
  def updateAgent(agent:Agent): Agent
  def removeAgent(id: Long): Agent
