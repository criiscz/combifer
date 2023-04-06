package shared

import zio.test.ZIOSpecDefault
import locations.domain.repository.LocationRepository
import category_products.CategoryProductsMockedRepository
import locations.domain.repository.LocationRepository
import locations.LocationMockedRepository
import products.ProductsMockedRepository
import products.domain.repository.ProductRepository
import category_products.domain.repository.CategoryProductRepository
import product_lots.domain.repository.ProductLotRepository
import product_lots.ProductLotMockedRepository
import sales.SalesMockedRepository
import sales.domain.repository.SaleRepository
import zio.Scope
import zio.test.Spec
import zio.test.TestEnvironment

class BaseSuite extends ZIOSpecDefault:

  override def spec: Spec[TestEnvironment & Scope, Any] = ???

  implicit val mockedProductRepo:ProductRepository = ProductsMockedRepository() 
  implicit val mockedCategoryRepo:CategoryProductRepository = CategoryProductsMockedRepository() 
  implicit val mockedLocationRepo:LocationRepository = LocationMockedRepository()
  implicit val mockedProductLotRepo:ProductLotRepository = ProductLotMockedRepository()
  implicit val mockedSalesRepo:SaleRepository = SalesMockedRepository()
