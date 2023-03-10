package shared.mapper.endpoints

import sttp.tapir._
import scala.collection.mutable.ListBuffer
import scala.collection.mutable.ListBuffer
import sttp.tapir.ztapir._

object Exposer:

  val availableRoutes: ListBuffer[Endpoint[_, _, _, _, _]] = ListBuffer()
  val availableEndpoints:ListBuffer[ZServerEndpoint[Any, Any]] = ListBuffer()
  
  extension[S, I, E, O, R] (route: Endpoint[S,I, E, O, R]) {
    def expose = 
      availableRoutes += route
      route
  }

  extension (endpoint: ZServerEndpoint[Any, Any]) {
    def expose = 
      availableEndpoints += endpoint
      endpoint
  }
