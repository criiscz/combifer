package category_products

import zio._
import zio.test._
import zio.test.Assertion._

import shared.BaseSuite
import category_products.application.create_category._
import category_products.application.get_category._

object TestSuite extends BaseSuite {
  val categoryName = "CategoriaXYZ"

  override def spec = suite("Categories Suite")(
    test("Get Category"){
      for
        createdCategory <- CreateCategoryUseCase().execute(RequestCreateCategory(name = categoryName, description = Some("material flexible")))
        obtainedCategory <- GetCategoryUseCase().execute(request = createdCategory.data.id)
      yield assertTrue(createdCategory.data.name == obtainedCategory.data.name)
    },
    test("Create Category"){
      for
        createdCategory <- CreateCategoryUseCase().execute(RequestCreateCategory(name = categoryName, description = Some("material tipo pesado")))
      yield assertTrue(createdCategory.data.name == categoryName)
    }
  )@@ TestAspect.sequential @@ TestAspect.timed
}
