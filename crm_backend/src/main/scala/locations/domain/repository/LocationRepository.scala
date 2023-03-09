package locations.domain.repository

import locations.domain.entity.Location

trait LocationRepository:
  def getLocation(id:Long):Option[Location]
  def getLocations(from:Int, to:Int):List[Location]
  def getTotalAmountOfLocations(): Long
  def insertLocation(location: Location):Unit
  def updateLocation(location: Location):Unit
  def removeLocation(id:Long):Unit

