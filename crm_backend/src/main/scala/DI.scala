import category_products.domain.repository.CategoryProductRepository
import category_products.infrastructure.repository.CategoryProductRepositoryImpl
import locations.domain.repository.LocationRepository
import locations.infrastructure.repository.LocationRepositoryImpl
import products.domain.repository.ProductRepository
import products.infrastructure.repository.ProductRepositoryImpl
import product_lots.infrastructure.repository.ProductLotRepositoryImpl
import product_lots.domain.repository.ProductLotRepository

trait DI:
  given categoryProductRepository: CategoryProductRepository = new CategoryProductRepositoryImpl()
  given productRepository: ProductRepository = new ProductRepositoryImpl()
  given locationRepository: LocationRepository = new LocationRepositoryImpl()
  given productLotRepository: ProductLotRepository = new ProductLotRepositoryImpl()

