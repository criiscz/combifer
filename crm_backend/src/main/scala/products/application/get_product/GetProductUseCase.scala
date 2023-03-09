package products.application.get_product

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository

class GetProductUseCase()(using productRepository:ProductRepository) extends BaseUseCase[RequestGetProduct, ResponseGetProduct]:

  override def execute(request: RequestGetProduct): Option[ResponseGetProduct] =
    productRepository.getProduct(request.id) match {
      case Some(value) => Some(ResponseGetProduct(value))
      case None => None
    }
