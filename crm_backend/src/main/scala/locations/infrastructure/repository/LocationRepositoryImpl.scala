package locations.infrastructure.repository

import locations.domain.repository.LocationRepository
import locations.domain.entity.Location
import shared.BaseRepository

import zio._
import scala.quoted.Quotes
import io.getquill._

class LocationRepositoryImpl extends LocationRepository with BaseRepository:

  import ctx._
  implicit inline def myEntitySchemaMeta():SchemaMeta[Location] = 
    schemaMeta[Location]("locations")
  implicit def excludeInsert():InsertMeta[Location] =
    insertMeta[Location](_.id)
  implicit def excludeUpdate():UpdateMeta[Location] = 
    updateMeta[Location](_.id)

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
    ctx.run(
      query[Location]
        .insertValue(lift(location))
    )

  override def updateLocation(location: Location): Unit =
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
  override def getTotalAmountOfLocations(): Long =
    ctx.run(
      query[Location].size
    )
