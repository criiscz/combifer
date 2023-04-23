package authentications.infrastructure.service

import com.github.t3hnar.bcrypt._
import authentications.domain.service.HashService
import scala.util.Failure
import scala.util.Success

class HashServiceImpl extends HashService:

  override def hashPassword(plainPassword: String):Option[String] =
    plainPassword.bcryptSafeBounded match
      case Failure(exception) => None
      case Success(value) => Some(value)

  override def areSamePassword(plainPassword: String, bcryptedPassword: String): Boolean = 
    plainPassword.isBcryptedSafeBounded(bcryptedPassword) match
      case Failure(exception) => false
      case Success(value) => value
    
