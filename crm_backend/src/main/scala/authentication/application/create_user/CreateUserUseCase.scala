package authentication.application.create_user

import shared.application.BaseUseCase
import authentication.domain.repository.AuthenticationRepository
import authentication.domain.entity.User

class CreateUserUseCase()(using authenticationRepository:AuthenticationRepository) extends BaseUseCase[RequestCreateUser,ResponseCreateUser]:

  override def execute(request: RequestCreateUser): Option[ResponseCreateUser] = 
    val user = User (
        id = request.document,
        username = request.userName,
        password = request.password,
        description = None,
        agentId = 0
    )
    // authenticationRepository.createUser()
    None

