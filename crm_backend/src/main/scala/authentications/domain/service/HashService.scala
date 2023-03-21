package authentications.domain.service

trait HashService:
  def hashPassword(plainPassword: String):Option[String] 
  def areSamePassword(plainPassword:String, bcryptedPassword: String):Boolean
