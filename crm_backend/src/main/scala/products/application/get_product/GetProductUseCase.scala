package products.application.get_product

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository
import zio.ZIO

class GetProductUseCase()
(using productRepository:ProductRepository) 
extends BaseUseCase[RequestGetProduct, ResponseGetProduct]:

  override def execute(request: RequestGetProduct) =
    productRepository.getProduct(request.id) match {
      case Some(value) => ZIO.succeed(ResponseGetProduct(value))
      case None => ZIO.fail(new Throwable())
    }
