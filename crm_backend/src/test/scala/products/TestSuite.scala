package products

import zio._
import zio.test._
import zio.test.Assertion._

import locations.application.create_location._
import locations.application.remove_location._
import products.application.create_product._
import products.application.remove_product._
import category_products.application.create_category._
import category_products.application.remove_category._

import shared.BaseSuite
import products.domain.entity._

object TestSuite extends BaseSuite:

  val locationName = "TestLocation"
  val categoryName = "Mocked Category"
  val productName = "Testing Product"

  var lastCreatedProduct:Long = -1
  var lastCreatedLocation:Long = -1
  var lastCreatedCategory:Long = -1
  
  override def spec = suite("Products Suite")(

    test("Create Category-product for Product"){
      for
        createdCategory <- CreateCategoryUseCase()
          .execute(
            RequestCreateCategory(name = categoryName, description = Some("material tipo liviano"))
          )
        _ <- ZIO.succeed{lastCreatedCategory = createdCategory.data.id}
      yield assertTrue(createdCategory.data.name == categoryName)
    },

    test("Create Location for Product"){
      for
        createdLocation <- CreateLocationUseCase()
          .execute(
            RequestCreateLocation( name = locationName, description = Some("Pasillo 2 cajon C"), null)
          )
        _ <- ZIO.succeed{lastCreatedLocation = createdLocation.data.id}
      yield assertTrue(createdLocation.data.name == locationName)
    },

    test("Create Product using location and category created above"){
      for
        createdProduct <- CreateProductUseCase()
        .execute(
          RequestCreateProduct(
            name = productName,
            description = Some("3 pulgadas"),
            measureUnit = "pulgadas",
            locationId = lastCreatedLocation,
            categoryProductId = lastCreatedCategory
          )
        )
        _ <- ZIO.succeed{lastCreatedProduct = createdProduct.data.id}
      yield assertTrue(createdProduct.data.name == productName)
    },

    test("Delete Product"){
      for
        removedProduct <- RemoveProductUseCase()
          .execute(
            RequestRemoveProduct(
              id = lastCreatedProduct
            )
          )
      yield assertTrue(removedProduct.data.id == lastCreatedProduct)
    },

    test("Delete Location of Product Deleted"){
      for
        removedLocation <- RemoveLocationUseCase()
          .execute( RequestRemoveLocation(lastCreatedLocation))
      yield assertTrue(removedLocation.data.id == lastCreatedLocation)
    },

    test("Delete Category of product deleted"){
      for
        removedCategory <- RemoveCategoryUseCase()
          .execute(
            RequestRemoveCategory(lastCreatedCategory)
          )
      yield assertTrue(removedCategory.data.id == lastCreatedCategory)
    },
  )@@ TestAspect.sequential @@ TestAspect.timed
