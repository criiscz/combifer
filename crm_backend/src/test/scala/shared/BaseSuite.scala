package shared

import locations.domain.repository.LocationRepository
import category_products.CategoryProductsMockedRepository 
import locations.domain.repository.LocationRepository
import locations.LocationMockedRepository
import products.ProductsMockedRepository
import products.domain.repository.ProductRepository
import category_products.domain.repository.CategoryProductRepository

trait BaseSuite extends munit.FunSuite:
  implicit val mockedProductRepo:ProductRepository = ProductsMockedRepository() 
  implicit val mockedCategoryRepo:CategoryProductRepository = CategoryProductsMockedRepository() 
  implicit val mockedLocationRepo:LocationRepository = LocationMockedRepository() 


