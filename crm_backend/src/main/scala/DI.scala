import category_products.domain.repository.CategoryProductRepository
import category_products.infrastructure.repository.CategoryProductRepositoryImpl
import locations.domain.repository.LocationRepository
import locations.infrastructure.repository.LocationRepositoryImpl
import products.domain.repository.ProductRepository
import products.infrastructure.repository.ProductRepositoryImpl
import product_lots.infrastructure.repository.ProductLotRepositoryImpl
import product_lots.domain.repository.ProductLotRepository
import authentications.domain.service.JwtService
import authentications.infrastructure.service.JwtServiceImpl
import authentications.infrastructure.repository.AuthenticationRepositoryImpl
import authentications.domain.repository.AuthenticationRepository
import agents.infrastructure.repository.AgentRepositoryImpl
import agents.domain.repository.AgentRepository
import authentications.domain.service.HashService
import authentications.infrastructure.service.HashServiceImpl

trait DI:
  given categoryProductRepository: CategoryProductRepository = new CategoryProductRepositoryImpl()
  given productRepository: ProductRepository = new ProductRepositoryImpl()
  given locationRepository: LocationRepository = new LocationRepositoryImpl()
  given productLotRepository: ProductLotRepository = new ProductLotRepositoryImpl()
  given authenticationRepository: AuthenticationRepository = new AuthenticationRepositoryImpl()
  given agentRepository: AgentRepository = new AgentRepositoryImpl()
  given jwtService: JwtService = new JwtServiceImpl()
  given hashService: HashService = new HashServiceImpl()

