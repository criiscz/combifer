package products.application.remove_product

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository
import zio.ZIO

class RemoveProductUseCase()(using productRepository: ProductRepository) extends BaseUseCase[RequestRemoveProduct, ResponseRemoveProduct]:

  override def execute(request: RequestRemoveProduct) = 
    // TODO: Check if the product has been asociated to a lot.
    val product = productRepository.removeProduct(request.id)
    ZIO.succeed(ResponseRemoveProduct(product))

