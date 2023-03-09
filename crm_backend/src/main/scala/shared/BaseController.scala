package shared

import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.server.ServerEndpoint
import sttp.capabilities.zio.ZioStreams
import zio.ZIO

trait BaseController:

  def routes(): List[Endpoint[_, _, _, _, _]]
  def endpoints():List[ZServerEndpoint[Any, Any]]
 
