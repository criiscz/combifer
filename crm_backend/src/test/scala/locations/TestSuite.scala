package locations

import zio._
import zio.test._
import zio.test.Assertion._

import shared.BaseSuite
import locations.application.get_location._
import locations.application.create_location._
import locations.domain.entity.Location

object TestSuite extends BaseSuite:

  val locationName = "LocationXYZ"

  override def spec = suite("Locations Suite")(
    test("Create Location"){
      for
        createdLocation <- CreateLocationUseCase().execute(RequestCreateLocation(name = locationName, description = Some("nice"), img_url= "Img Url"))
      yield assertTrue(createdLocation.data.name == locationName)
    },
    test("Get Location"){
      for
        createdLocation <- CreateLocationUseCase().execute(RequestCreateLocation(name = locationName, description = Some("nice"), img_url= "Img Url"))
        obtainedLocation <- GetLocationUseCase().execute(RequestGetLocation(id = createdLocation.data.id))
      yield assertTrue(createdLocation.data.name == obtainedLocation.data.name)
    }
  )@@ TestAspect.sequential @@ TestAspect.timed
