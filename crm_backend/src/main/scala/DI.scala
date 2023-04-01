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
import authorizations.infrastructure.repository.AuthorizationRepositoryImpl
import authorizations.domain.repository.AuthorizationRepository
import taxes.infrastructure.repository.TaxRespositoryImpl
import taxes.domain.repository.TaxRepository

trait DI:
  given jwtService: JwtService = new JwtServiceImpl()
  given categoryProductRepository: CategoryProductRepository = new CategoryProductRepositoryImpl()
  given productRepository: ProductRepository = new ProductRepositoryImpl()
  given locationRepository: LocationRepository = new LocationRepositoryImpl()
  given productLotRepository: ProductLotRepository = new ProductLotRepositoryImpl()
  given authenticationRepository: AuthenticationRepository = new AuthenticationRepositoryImpl()
  given authorizationRepository: AuthorizationRepository = new AuthorizationRepositoryImpl()
  given agentRepository: AgentRepository = new AgentRepositoryImpl()
  given taxRepository: TaxRepository = new TaxRespositoryImpl()
  given hashService: HashService = new HashServiceImpl()

