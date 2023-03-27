package locations.domain.repository

import locations.domain.entity.Location

trait LocationRepository:
  def getLocation(id:Long):Option[Location]
  def getLocations(from:Int, to:Int):List[Location]
  def getTotalAmountOfLocations(): Long
  def insertLocation(location: Location):Location
  def updateLocation(location: Location):Location
  def removeLocation(id:Long):Location

