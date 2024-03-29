package products.application.create_product

import products.domain.repository.ProductRepository
import products.domain.entity.Product
import shared.application._
import zio.ZIO

class CreateProductUseCase()
(using productRepository: ProductRepository) 
extends BaseUseCase[RequestCreateProduct, ResponseCreateProduct]:

  override def execute(request: RequestCreateProduct) =
    ZIO.succeed {
      val product = productRepository.insertProduct(
        Product(
          name = request.name,
          description = request.description,
          measureUnit = request.measureUnit,
          locationId = request.locationId,
          categoryProductId = request.categoryProductId
        )
      )
      ZIO.succeed(ResponseCreateProduct(product))
    }.flatten
