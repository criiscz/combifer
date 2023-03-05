import category_products.domain.repository.CategoryProductRepository
import category_products.infrastructure.repository.CategoryProductRepositoryImpl

trait DI:
  given categoryProductRepository: CategoryProductRepository = new CategoryProductRepositoryImpl()

