package shared

import io.getquill._
import io.getquill.context.jdbc.JdbcContext
import io.getquill.context.sql.idiom.SqlIdiom

trait BaseRepository:
  val ctx:JdbcContext[_ <: SqlIdiom,_ <: NamingStrategy] = new PostgresJdbcContext(SnakeCase, "productionDatabase")
