package shared

import io.getquill._
import io.getquill.context.jdbc.JdbcContext
import io.getquill.context.sql.idiom.SqlIdiom

trait BaseRepository:
  val ctx = new PostgresJdbcContext(SnakeCase, "productionDatabase")
