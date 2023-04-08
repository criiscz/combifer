package shared

import zio.Scope
import zio.test.Spec
import zio.test.TestEnvironment
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
import sale_products.SaleProductMockedRepository
import sales.domain.repository.SaleRepository
import taxes.TaxesMockedRepository
import taxes.domain.repository.TaxRepository
import sale_products.domain.repository.SaleProductRepository
import authentications.domain.repository.AuthenticationRepository
import authentication.AuthenticationMockedRepository 
import authentication.HashMockedService
import agents.domain.repository.AgentRepository
import agents.AgentMockedRepository
import authentications.domain.service.HashService

class BaseSuite extends ZIOSpecDefault:

  override def spec: Spec[TestEnvironment & Scope, Any] = ???

  implicit val mockedProductRepo:ProductRepository = ProductsMockedRepository() 
  implicit val mockedCategoryRepo:CategoryProductRepository = CategoryProductsMockedRepository() 
  implicit val mockedLocationRepo:LocationRepository = LocationMockedRepository()
  implicit val mockedProductLotRepo:ProductLotRepository = ProductLotMockedRepository()
  implicit val mockedSalesRepo:SaleRepository = SalesMockedRepository()
  implicit val mockedTaxRepo:TaxRepository = TaxesMockedRepository()
  implicit val mockedSaleProductRepo:SaleProductRepository = SaleProductMockedRepository()
  implicit val mockedAuthenticationRepo: AuthenticationRepository = AuthenticationMockedRepository()
  implicit val mockedAgentRepo: AgentRepository = AgentMockedRepository()
  implicit val mockedHashService: HashService = HashMockedService()
