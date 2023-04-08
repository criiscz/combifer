package sales

import authentications.application.create_user.{CreateUserUseCase, RequestCreateUser}
import category_products.application.create_category.*
import category_products.application.remove_category.*
import locations.application.create_location.*
import locations.application.remove_location.*
import products.application.create_product.*
import products.application.remove_product.{RemoveProductUseCase, *}
import products.domain.entity.*
import sales.application.create_sale.{CreateSaleUseCase, RequestCreateSale}
import authentications.domain.entity.UserContext
import shared.BaseSuite

import zio.*
import zio.test.*
import zio.test.Assertion.*
import scala.util.Random

object TestSuite extends BaseSuite:

  val locationName = "TestLocation"
  val categoryName = "Mocked Category"
  val productName = "Testing Product"
  val productNames = List("Product 1", "Product 2", "Product 3")


  var lastCreatedProduct:Long = -1
  var lastCreatedLocation:Long = -1
  var lastCreatedCategory:Long = -1
  var lastCreatedClient:Long = -1

  override def spec = suite("Sales Suite")(
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

    test("Create list of products using location and category created above") {
      productNames.map { name => 
        for 
          createdProduct <- CreateProductUseCase().execute(
            RequestCreateProduct(
              name = "",
              description = Some("3 pulgadas"),
              measureUnit = "pulgadas",
              locationId = lastCreatedLocation,
              categoryProductId = lastCreatedCategory
            )
          )
        yield assertTrue(createdProduct.data.name == name)
      }
      assertCompletes
    },

    test("Create client for sale"){
      for 
        client <- CreateUserUseCase().execute(
          RequestCreateUser(
            document = Random().nextInt(),
            documentType = "CC",
            name = "Mr Doom",
            lastName = "Emacs",
            phone = "3123132453",
            email = "mremacs@mail.com",
            userName = Random().nextInt().toString,
            password = "123456"
          )
        )
        _ <- ZIO.succeed{lastCreatedClient = client.document}
      yield assertCompletes
    },

    test("Create Sale using product"){
      for
      createdSale <- CreateSaleUseCase(UserContext(lastCreatedClient, "Jose", lastCreatedClient))
        .execute(
          RequestCreateSale(
            description = Some("venta en la maniana"),
            clientId = lastCreatedClient,
            products = List() 
          )
        )
      yield assertTrue(true)
    },

    // test("Remove list of products using location and category created above") {
    //   val removedProductList = for {
    //     p <- products
    //     removedProduct <- RemoveProductUseCase().execute(
    //       RequestRemoveProduct(
    //         p.id
    //       )
    //   )} yield removedProduct.data
    // assertTrue(removedProductList.forall(p => productNames.contains(p.name)))
    // },

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
