package roles.infrastructure.repository

import shared.BaseRepository
import roles.domain.repository.RoleRepository
import roles.domain.entity.Role

import io.getquill._

class RoleRepositoryImpl extends RoleRepository with BaseRepository:

    import ctx._

    override def getRole(roleId: Long): Option[Role] =
      ctx.run(
        query[Role]
          .filter(_.id == lift(roleId))
      ).headOption

    override def getRoles(from: Int, to: Int): List[Role] =
      ctx.run(
        query[Role]
        .sortBy(_.id)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
    )

    override def insertRole(role: Role): Role =
      ctx.run(
        query[Role]
          .insertValue(lift(role))
          .returning(r => r)
      )

    override def removeRole(roleId: Long): Role =
      ctx.run(
        query[Role]
          .filter(_.id == lift(roleId))
          .delete
          .returning(r => r)
      )

    override def updateRole(role: Role): Role =
      ctx.run(
        query[Role]
          .filter(_.id == role.id)
          .updateValue(lift(role))
          .returning(r => r)
      )

    override def getTotalAmountOfRoles(): Long =
      ctx.run(
        query[Role].size
      )
