package product_lots

import zio._
import zio.test._
import zio.test.Assertion._

import shared.{BaseRepository, BaseSuite}
import product_lots.application.create_lot.CreateLotUseCase
import product_lots.application.create_lot.RequestCreateLot
import product_lots.application.remove_lot.RemoveLotUseCase
import product_lots.application.remove_lot.RequestRemoveLot

import products.application.create_product.CreateProductUseCase
import products.application.create_product.RequestCreateProduct
import products.application.remove_product.RemoveProductUseCase
import products.application.remove_product.RequestRemoveProduct


import locations.application.create_location.CreateLocationUseCase
import locations.application.create_location.RequestCreateLocation
import locations.application.remove_location.RemoveLocationUseCase
import locations.application.remove_location.RequestRemoveLocation


import category_products.application.create_category.CreateCategoryUseCase
import category_products.application.create_category.RequestCreateCategory
import category_products.application.remove_category.RemoveCategoryUseCase
import category_products.application.remove_category.RequestRemoveCategory

import java.time.LocalDate

object TestSuite extends BaseSuite:
  val locationName = "Location ABC"
  val categoryProductName = "Categoria A"
  val productName = "Tornillo A"

  var lastCreatedProduct: Long = -1
  var lastCreatedLocation: Long = -1
  var lastCreatedCategoryProduct: Long = -1
  var lastCreatedProductLot: Long = -1

  override def spec = suite("Product Lots Suite")(

    test("Create category-product for product"){
      for
        createdCategory <- CreateCategoryUseCase()
          .execute(
            RequestCreateCategory(name = categoryProductName, description = Some("material tipo liviano"))
          )
        _ <- ZIO.succeed{lastCreatedCategoryProduct = createdCategory.data.id}
      yield assertTrue(createdCategory.data.name == categoryProductName)
    },

    test("Create location for product"){
      for
        createdLocation <- CreateLocationUseCase()
          .execute(
            RequestCreateLocation( name = locationName, description = Some("Pasillo 2 cajon C"), null)
          )
        _ <- ZIO.succeed{lastCreatedLocation = createdLocation.data.id}
      yield assertTrue(createdLocation.data.name == locationName)
    },

    test("Create product for product-lot"){
      for
        createdProduct <- CreateProductUseCase()
          .execute(
            RequestCreateProduct(
              name = productName,
              description = Some("3 pulgadas"),
              measureUnit = "pulgadas",
              locationId = lastCreatedLocation,
              categoryProductId = lastCreatedCategoryProduct
            )
          )
        _ <- ZIO.succeed{lastCreatedProduct = createdProduct.data.id}
      yield assertTrue(createdProduct.data.name == productName)
    },
    
    test("Create product-lots using product, category product and location created above"){
      for
        createdLot <- CreateLotUseCase()
          .execute(
            RequestCreateLot(
              price = 1.000,
              LocalDate.now(),
              None,
              Some(100),
              lastCreatedProduct)
            )
        _ <- ZIO.succeed{lastCreatedProductLot = createdLot.data.id}
      yield assertTrue(createdLot.data.productId == lastCreatedProduct)
    },

    test("Delete Product-lot"){
      for
        removedLot <- RemoveLotUseCase()
          .execute(RequestRemoveLot( id = lastCreatedProductLot))
      yield assertTrue(removedLot.data.id == lastCreatedProductLot)
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
            RequestRemoveCategory(lastCreatedCategoryProduct)
          )
      yield assertTrue(removedCategory.data.id == lastCreatedCategoryProduct)
    },
  )@@ TestAspect.sequential @@ TestAspect.timed
