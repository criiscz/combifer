package authentications.domain.repository

import authentications.domain.entity.User
import agents.domain.entity.Agent

trait AuthenticationRepository:
  def getUserByUsername(username:String):Option[User]
  def getUserByEmail(email:String):Option[User]
  def createUser(user:User):User
  def getUsers(from: Int, to: Int): List[(User, Agent)]
  def getTotalAmountOfUsers():Long
  def getUserById(userId: Long):Option[(User, Agent)]
  def getUserByIdDocument(idDocument: Long):Option[(User, Agent)]
