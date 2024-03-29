package sales.application.get_sale

import shared.application.BaseUseCase
import zio._
import sales.domain.repository.SaleRepository
import sale_products.domain.repository.SaleProductRepository

class GetSaleUseCase
(using
  saleRepository: SaleRepository,
  saleProductRepository: SaleProductRepository
)
extends BaseUseCase[RequestGetSale, ResponseGetSale]:

  override def execute(request: RequestGetSale): Task[ResponseGetSale] =
    ZIO.attempt {
      for
        sale <- ZIO.fromOption(saleRepository.getSale(request.saleId))
          .mapError(e => Throwable("Can't find sale entitiy"))
        products <- ZIO.attempt(
          saleProductRepository.getSoldProductsOfSale(request.saleId)
        ).mapError(e => Throwable("Can't find sale products"))
      yield (
        ResponseGetSale (
          sale = sale(0),
          employee = sale(1),
          client = sale(2),
          products = products
        )
      )
    }.flatten
