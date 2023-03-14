package locations

import locations.application.get_location._
import locations.application.create_location._
import locations.domain.repository.LocationRepository
import locations.domain.entity.Location

class TestSuite extends munit.FunSuite:

  implicit val mockedLocationRepository:LocationRepository = LocationMockedRepository()

  test("Create location") {
    val obtained = CreateLocationUseCase()
      .execute(RequestCreateLocation(name = "Location 123", description = Some("nice"), img_url= "Img Url"))
      .get
      .data
      .name
      assertEquals(obtained, "Location 123")
  }

  test("Get Location") {
    val locationCreated = CreateLocationUseCase()
      .execute(RequestCreateLocation(name = "TestingLocation321", description = Some("nice"), img_url= "Img Url"))
      .get
      .data
      .id

    val obtained = GetLocationUseCase()
      .execute(RequestGetLocation(id = locationCreated)).get.data.name
    val expected = "TestingLocation321"
    assertEquals(obtained, expected)
  }
