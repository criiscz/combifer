package permissions.domain.entity

case class Permission (
  id: Long = -1,
  name: String,
  accessModule: String,
  roleId: Long
)
