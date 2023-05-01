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
import sale_products.domain.repository.SaleProductRepository
import sale_products.infrastructure.repository.SaleProductRepositoryImpl
import sales.domain.repository.SaleRepository
import sales.infrastructure.repository.SaleRepositoryImpl
import recommendations.domain.service.SparkService
import recommendations.infrastructure.service.SparkServiceImpl
import recommendations.domain.repository.RecommendationProductRepository
import recommendations.infrastructure.repository.RecommendationProductRepositoryImpl
import roles.domain.repository.RoleRepository
import roles.infrastructure.repository.RoleRepositoryImpl
import permissions.domain.repository.PermissionRepository
import permissions.infrastructure.repository.PermissionRepositoryImpl

trait DI:
  given jwtService: JwtService = new JwtServiceImpl()
  given roleRepository: RoleRepository = new RoleRepositoryImpl()
  given permissionRepository: PermissionRepository = new PermissionRepositoryImpl()
  given categoryProductRepository: CategoryProductRepository = new CategoryProductRepositoryImpl()
  given productRepository: ProductRepository = new ProductRepositoryImpl()
  given locationRepository: LocationRepository = new LocationRepositoryImpl()
  given productLotRepository: ProductLotRepository = new ProductLotRepositoryImpl()
  given authenticationRepository: AuthenticationRepository = new AuthenticationRepositoryImpl()
  given authorizationRepository: AuthorizationRepository = new AuthorizationRepositoryImpl()
  given agentRepository: AgentRepository = new AgentRepositoryImpl()
  given taxRepository: TaxRepository = new TaxRespositoryImpl()
  given saleProductRepository: SaleProductRepository = new SaleProductRepositoryImpl()
  given saleRepository: SaleRepository = new SaleRepositoryImpl()
  given hashService: HashService = new HashServiceImpl()
  //given sparkService: SparkService = new SparkServiceImpl()
  given recommendationRepository: RecommendationProductRepository = new RecommendationProductRepositoryImpl()
