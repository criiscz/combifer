package products

import products.infrastructure.repository.ProductRepositoryImpl
import shared.BaseMockedRepository

class ProductsMockedRepository extends ProductRepositoryImpl with BaseMockedRepository
