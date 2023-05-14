package permissions.application.update_permission

case class RequestUpdatePermission (
  name: String,
  accessModule: String,
  roleId: Long
)
