package products

import locations.application.create_location._
import locations.application.remove_location._
import products.application.create_product._
import products.application.remove_product._
import category_products.application.create_category._
import category_products.application.remove_category._

import shared.BaseSuite
import products.domain.entity._
import munit._

class TestSuite extends BaseSuite:

  val locationName = "TestLocation"
  val categoryName = "Mocked Category"
  val productName = "Testing Product"

  var lastCreatedProduct:Long = -1
  var lastCreatedLocation:Long = -1
  var lastCreatedCategory:Long = -1
  
  test("Create Location for product") {
    val response = CreateLocationUseCase().execute(
      RequestCreateLocation(
        name = locationName,
        description = None,
        img_url = "Imagen"
      )
    )

    val location = response match
      case Some(value) => value._1
      case None => throw Exception("Can't create location for product")
    
    lastCreatedLocation = location.id
    assertEquals(location.name, locationName)
  }

  test("Create Category for Product") {
    val response = CreateCategoryUseCase().execute(
      RequestCreateCategory(
        name = categoryName,
        description = None
      )
    )

    val category = response match
      case Some(value) => value._1
      case None => throw Exception("Can't create Category")

    lastCreatedCategory = category.id
    assertEquals(category.name, categoryName)
  }

  test("Create Product using Category and Location created") {
    val createdProduct = CreateProductUseCase().execute(
      RequestCreateProduct(
        name = productName,
        description = Some("Description Test"),
        measureUnit = "Kilo",
        locationId = lastCreatedLocation,
        categoryProductId = lastCreatedCategory
        )
      )
    
    val product:Product = createdProduct match
      case Some(value) => value._1
      case None => throw Exception("Can't create Product")

    lastCreatedProduct = product.id

    assertEquals(product.locationId, lastCreatedLocation)
    assertEquals(product.categoryProductId, lastCreatedCategory)
    assertEquals(product.name, productName)
  }

  test("Delete Product") {
    val removedProduct = RemoveProductUseCase().execute(
      RequestRemoveProduct(id = lastCreatedProduct)
    ) match
      case Some(value) => value._1
      case None =>  throw Exception("Can't remove product")

    assertEquals(productName, removedProduct.name)
  }

  test("Delete Location of product deleted") {
    val removedLocation = RemoveLocationUseCase()
      .execute(
        RequestRemoveLocation(lastCreatedLocation)
      ) match 
        case Some(value) => value._1
        case None => throw Exception("Can't remove Location")
    assertEquals(locationName, removedLocation.name)
  }

  test("Delete Category of product deleted") {
    val removedCategory = RemoveCategoryUseCase()
      .execute(
        RequestRemoveCategory(lastCreatedCategory)
      ) match
        case Some(value) => value._1
        case None => throw Exception("Can't remove Category")

    assertEquals(categoryName, removedCategory.name)
  }
