package category_products

import shared.BaseSuite
import  category_products.application.create_category._
import  category_products.application.get_category._
class TestSuite extends BaseSuite {

  test("Get Category-product") {
    val categoryProductCreated = CreateCategoryUseCase()
      .execute(RequestCreateCategory(name = "CategoriaXYZ", description = Some("material flexible")))
      .get
      .data
      .id
    val categoryProductObtained = GetCategoryUseCase()
      .execute(request =  categoryProductCreated).get.data.name
      val nameCategoryExpected = "CategoriaXYZ"
      assertEquals(categoryProductObtained, nameCategoryExpected)
  }

  test("Create Category-product") {
    val categoryProductCreated = CreateCategoryUseCase()
      .execute(RequestCreateCategory(name = "CategoriaA", description = Some("material tipo pesado")))
      .get
      .data
      .name
    assertEquals(categoryProductCreated, "CategoriaA")
  }
}
