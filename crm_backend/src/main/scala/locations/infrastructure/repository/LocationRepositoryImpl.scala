package locations.infrastructure.repository

import locations.domain.repository.LocationRepository
import locations.domain.entity.Location
import shared.BaseRepository

import zio._
import scala.quoted.Quotes
import io.getquill._

class LocationRepositoryImpl extends LocationRepository with BaseRepository:

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

  override def insertLocation(location: Location): Location =
    ctx.run(
      query[Location]
        .insertValue(lift(location))
        .returning(r => r)
    )

  override def updateLocation(location: Location): Location =
    ctx.run(
      query[Location]
        .filter(_.id == lift(location.id))
        .updateValue(lift(location))
        .returning(r => r)
    )
  override def removeLocation(id: Long): Location =
    ctx.run(
      query[Location]
        .filter(_.id == lift(id))
        .delete
        .returning(r => r)
    )
  override def getTotalAmountOfLocations(): Long =
    ctx.run(
      query[Location].size
    )
