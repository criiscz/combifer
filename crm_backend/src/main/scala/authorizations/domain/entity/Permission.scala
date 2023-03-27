package authorizations.domain.entity

case class Permission (
  id: Long,
  name: String,
  accessModule: String,
  roleId: Long
)
