package product_lots

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

class TestSuite extends BaseSuite:
  val locationName = "Location ABC"
  val CategoryProductName = "Categoria A"
  val productName = "Tornillo A"

  var lastCreatedProduct: Long = -1
  var lastCreatedLocation: Long = -1
  var lastCreatedCategoryProduct: Long = -1
  var lastCreatedProductLot: Long = -1

  test("Create category-product for product"){
    val categoryProductCreated = CreateCategoryUseCase()
      .execute(
        RequestCreateCategory(
          name = CategoryProductName,
          description = Some("material tipo liviano")
        )
      )
    val categoryProduct = categoryProductCreated match
      case Some(value) => value._1
      case None => throw Exception("Can't create Category")

    lastCreatedCategoryProduct = categoryProduct.id
    assertEquals(categoryProduct.name, CategoryProductName)
  }

  test("Create location for product"){
    val locationCreated = CreateLocationUseCase()
      .execute(
        RequestCreateLocation(
          name = locationName,
          description = Some("Pasillo 2 cajon C"),
          null)
      )
    val location = locationCreated match
      case Some(value) => value._1
      case None => throw  Exception("Can't create location")

    lastCreatedLocation = location.id
    assertEquals(location.name, locationName)
  }

  test(name = "Create product for product-lot"){
    val productCreated = CreateProductUseCase()
      .execute(
        RequestCreateProduct(
          name = productName,
          description = Some("3 pulgadas"),
          measureUnit = "pulgadas",
          locationId = lastCreatedLocation,
          categoryProductId = lastCreatedCategoryProduct
        )
      )
    val product = productCreated match
      case Some(value) => value._1
      case None => throw Exception("Can't create product")

    lastCreatedProduct = product.id
    assertEquals(product.name,productName)
  }

  test("Create product-lots using product, category product and location created above"){
    val productLotObtained = CreateLotUseCase()
      .execute(
        RequestCreateLot(
          price = 1.000,
          LocalDate.now(),
          None,
          Some(100),
          lastCreatedProduct)
      )
    val productLot = productLotObtained match
      case Some(value) => value._1
      case None => throw Exception("Can't create product-lot")
    lastCreatedProductLot = productLot.id
    assertEquals(productLotObtained.get.data.productId, lastCreatedProduct)
  }

  test("Delete product-lot"){
    val removedProductLot = RemoveLotUseCase()
      .execute(
        RequestRemoveLot(
          id = lastCreatedProductLot
        )
      )match
        case Some(value) => value._1
        case None => throw Exception("Can't remove product-lot")

    assertEquals(removedProductLot.id, lastCreatedProductLot)
  }

  test("Delete product") {
    val removedProduct = RemoveProductUseCase()
      .execute(
        RequestRemoveProduct(
          id = lastCreatedProduct
        )
      )match
        case Some(value) => value._1
        case None => throw Exception("Can't remove product")
    assertEquals(removedProduct.id, lastCreatedProduct)
  }

  test("Delete Location of product deleted") {
    val removedLocation = RemoveLocationUseCase()
      .execute(
        RequestRemoveLocation(lastCreatedLocation)
      ) match
      case Some(value) => value._1
      case None => throw Exception("Can't remove Location")
    assertEquals(removedLocation.id, lastCreatedLocation)
  }

  test("Delete Category of product deleted") {
    val removedCategory = RemoveCategoryUseCase()
      .execute(
        RequestRemoveCategory(lastCreatedCategoryProduct)
      ) match
      case Some(value) => value._1
      case None => throw Exception("Can't remove Category")
    assertEquals(removedCategory.id, lastCreatedCategoryProduct)
  }
