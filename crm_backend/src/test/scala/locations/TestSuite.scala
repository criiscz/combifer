package locations

import shared.BaseSuite
import locations.application.get_location._
import locations.application.create_location._
import locations.domain.entity.Location

class TestSuite extends BaseSuite:

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
