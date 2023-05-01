package permissions.infrastructure.repository

import permissions.domain.repository.PermissionRepository
import permissions.domain.entity.Permission
import shared.BaseRepository

import io.getquill._

class PermissionRepositoryImpl extends PermissionRepository with BaseRepository:

  import ctx._

  override def getPermissions(from: Int, to: Int): List[Permission] =
    ctx.run(
      query[Permission]
      .sortBy(_.id)(Ord.ascNullsLast)
      .take(lift(to))
      .drop(lift(from))
    )

  override def insertPermission(permission: Permission): Permission =
    ctx.run(
      query[Permission]
        .insertValue(lift(permission))
        .returning(r => r)
    )

  override def updatePermission(permission: Permission): Permission =
    ctx.run(
      query[Permission]
        .filter(_.id == permission.id)
        .updateValue(lift(permission))
        .returning(r => r)
    )

  override def removePermission(id: Long): Permission =
    ctx.run(
      query[Permission]
        .filter(_.id == lift(id))
        .delete
        .returning(r => r)
    )

  override def getTotalAmountOfPermissions(): Long =
    ctx.run(
      query[Permission].size
    )
