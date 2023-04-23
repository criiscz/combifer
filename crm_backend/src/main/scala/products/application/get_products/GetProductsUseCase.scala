package products.application.get_products

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository
import zio.ZIO

class GetProductsUseCase()
(using productRepository:ProductRepository) 
extends BaseUseCase[RequestGetProducts, ResponseGetProducts]:

  override def execute(request: RequestGetProducts) =
    ZIO.succeed(
      for 
        products <- ZIO.succeed(productRepository.getProducts(request.from, request.to))
        total <- ZIO.succeed(productRepository.getTotalAmountOfProducts())
      yield( ResponseGetProducts( data = products, request = request, total = total) )
    ).flatten

