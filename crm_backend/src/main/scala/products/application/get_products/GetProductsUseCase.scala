package products.application.get_products

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository

class GetProductsUseCase()(using productRepository:ProductRepository) extends BaseUseCase[RequestGetProducts, ResponseGetProducts]:

  override def execute(request: RequestGetProducts): Option[ResponseGetProducts] =
    Some(
      ResponseGetProducts(
        data = productRepository.getProducts(request.page, request.perPage),
        request = request,
        total = productRepository.getTotalAmountOfProducts()
      )
    )

