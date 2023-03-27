package products.application.update_product

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository
import products.domain.entity.Product
import zio.ZIO

class UpdateProductUseCase(productId:Long)(using productRepository: ProductRepository) extends BaseUseCase[RequestUpdateProduct, ResponseUpdateProduct]:

  override def execute(request: RequestUpdateProduct) = 
    productRepository.updateProduct(
      Product(
        id = productId,
        name = request.name,
        description = request.description,
        measureUnit = request.measureUnit,
        locationId = request.locationId,
        categoryProductId = request.categoryProductId 
      )
    )
    ZIO.succeed(ResponseUpdateProduct("Product Created"))
