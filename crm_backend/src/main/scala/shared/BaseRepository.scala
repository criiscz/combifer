package shared

import io.getquill._

trait BaseRepository:
  val ctx = new PostgresJdbcContext(SnakeCase, "productionDatabase")
