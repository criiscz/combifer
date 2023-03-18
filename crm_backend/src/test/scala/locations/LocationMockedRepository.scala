package locations

import locations.infrastructure.repository.LocationRepositoryImpl
import io.getquill._

class LocationMockedRepository extends LocationRepositoryImpl:
  val explanation:String = "This should be working with H2 but..."
  // override val ctx = new H2JdbcContext(SnakeCase, "ctx")
