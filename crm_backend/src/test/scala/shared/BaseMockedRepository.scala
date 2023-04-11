package shared

import io.getquill._

object BaseMockedRepository:
  lazy val postgresConnection = new PostgresJdbcContext(SnakeCase, "testDatabase")

trait BaseMockedRepository extends BaseRepository:
  override val ctx = BaseMockedRepository.postgresConnection
