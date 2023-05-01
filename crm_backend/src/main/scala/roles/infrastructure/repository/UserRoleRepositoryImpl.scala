package roles.infrastructure.repository

import roles.domain.repository.UserRoleRepository
import shared.BaseRepository
import roles.domain.entity.UserRole

import io.getquill._

class UserRoleRepositoryImpl extends UserRoleRepository with BaseRepository:
  import ctx._

  override def insertUserRole(userRole: UserRole): UserRole =
    ctx.run(
      query[UserRole]
        .insertValue(lift(userRole))
        .returning(r => r)
    )
