package shared.application

import zio._

abstract class BaseUseCase[Req, Res]:
  def execute(request: Req):Task[Res]
