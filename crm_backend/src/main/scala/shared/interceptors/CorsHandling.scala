package shared.interceptors

import sttp.tapir.server.interceptor.cors.CORSConfig
import sttp.tapir.server.interceptor.cors.CORSConfig.AllowedOrigin

object CorsHandling:

  val config: CORSConfig = 
    CORSConfig.default.copy(
      allowedOrigin = AllowedOrigin.All
    )
