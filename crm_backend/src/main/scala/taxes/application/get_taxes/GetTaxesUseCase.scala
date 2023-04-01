package taxes.application.get_taxes

import taxes.domain.repository.TaxRepository
import shared.application.BaseUseCase
import zio.Task
import zio.ZIO

class GetTaxesUseCase()
(using taxRepository: TaxRepository)
extends BaseUseCase[RequestGetTaxes, ResponseGetTaxes]:

  override def execute(request: RequestGetTaxes): Task[ResponseGetTaxes] = 
    ZIO.succeed{
      for
        taxes <- ZIO.succeed(taxRepository.getTaxes(request.from, request.to))
        amountOfTaxes <- ZIO.succeed(taxRepository.getTotalAmountOfTaxes())
      yield (
        ResponseGetTaxes(
          data = taxes,
          total = amountOfTaxes,
          request = request)
      )
    }.flatten

