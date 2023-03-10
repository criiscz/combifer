package products.application.update_product

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository
import products.domain.entity.Product

class UpdateProductUseCase()(using productRepository: ProductRepository) extends BaseUseCase[RequestUpdateProduct, ResponseUpdateProduct]:

  override def execute(request: RequestUpdateProduct): Option[ResponseUpdateProduct] = 
    productRepository.updateProduct(
      Product(
        name = request.name,
        description = request.description,
        measureUnit = request.measureUnit,
        locationId = request.locationId,
        categoryProductId = request.categoryProductId 
      )
    )
    Some(ResponseUpdateProduct("Product Created"))
