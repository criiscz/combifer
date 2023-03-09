package products.application.remove_product

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository

class RemoveProductUseCase()(using productRepository: ProductRepository) extends BaseUseCase[RequestRemoveProduct, ResponseRemoveProduct]:

  override def execute(request: RequestRemoveProduct): Option[ResponseRemoveProduct] = 
    // TODO: Check if the product has been asociated to a lot.
    productRepository.removeProduct(request.id)
    Some(ResponseRemoveProduct("created"))

