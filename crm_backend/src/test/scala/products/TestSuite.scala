package products

import locations.domain.repository.LocationRepository
import locations.LocationMockedRepository
import locations.application.create_location._

import category_products.CategoryProductsMockedRepository 
import category_products.domain.repository.CategoryProductRepository
import category_products.application.create_category._

import products.domain.repository.ProductRepository
import products.domain.entity._
import products.application.create_product._

import sttp.tapir.Schema.annotations.description

class TestSuite extends munit.FunSuite:

  implicit val mockedProductRepo:ProductRepository = ProductsMockedRepository() 
  implicit val mockedCategoryRepo:CategoryProductRepository = CategoryProductsMockedRepository() 
  implicit val mockedLocationRepo:LocationRepository = LocationMockedRepository() 

  test("Create Product along Location with Category") {
    val location = CreateLocationUseCase().execute(
      RequestCreateLocation(
        name = "Testing Location",
        description = None,
        img_url = "Imagen"
      )
    )

    val locationId = location match
      case Some(value) => value._1.id
      case None => throw Exception("Can't create location for product")

    val category = CreateCategoryUseCase().execute(
      RequestCreateCategory(
        name = "Testing Category",
        description = None
      )
    )

    val categoryId = category match
      case Some(value) => value._1.id
      case None => throw  Exception("Can't create Category")

    val createdProduct = CreateProductUseCase().execute(
      RequestCreateProduct(
        name = "Testing Product",
        description = Some("Description Test"),
        measureUnit = "Kilo",
        locationId = locationId,
        categoryProductId = categoryId
        )
      )
    
    val product:Product = createdProduct match
      case Some(value) => value._1
      case None => throw Exception("Can't create Product")

    assertEquals(product.locationId, locationId)
    assertEquals(product.categoryProductId, categoryId)
  }
