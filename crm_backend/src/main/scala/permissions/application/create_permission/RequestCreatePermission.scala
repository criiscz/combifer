package permissions.application.create_permission


case class RequestCreatePermission (
  name: String,
  accessModule: String,
  roleId: Long
)
