package locations.infrastructure.repository

import locations.domain.repository.LocationRepository
import locations.domain.entity.Location
import shared.BaseRepository


import zio._
import scala.quoted.Quotes
import io.getquill._
import com.zaxxer.hikari.HikariDataSource


class LocationRepositoryImpl extends LocationRepository with BaseRepository:
  implicit val myEntitySchemaMeta: SchemaMeta[Location] = schemaMeta[Location]("LOCATIONS")
  import ctx._


  override def getLocation(id: Long): Option[Location] =
    ctx
      .run(
        query[Location].filter(_.id==lift(id))
      ).headOption

  override def getLocations(from: Int, to: Int): List[Location] =
    val q = quote{
      query[Location]
        .sortBy(x => x.id)(Ord.ascNullsLast)
        .drop(lift(from))
        .take(lift(to))
    }
    ctx.run(q)

  override def insertLocation(location: Location): Unit =
    implicit val excludeInsert = insertMeta[Location](_.id)
    ctx.run(
      query[Location]
        .insertValue(lift(location))
    )

  override def updateLocation(location: Location): Unit =
    implicit val excludeUpdate = updateMeta[Location](_.id)
    ctx.run(
      query[Location]
        .filter(_.id == lift(location.id))
        .updateValue(lift(location))
    )
  override def removeLocation(id: Long): Unit =
    ctx.run(
      query[Location]
        .filter(_.id == lift(id))
        .delete
    )


