package taxes.application.create_tax

import shared.application.BaseUseCase
import zio.Task
import taxes.domain.repository.TaxRepository
import zio.ZIO
import taxes.domain.entity.Tax

class CreateTaxUseCase()
(using taxRepository: TaxRepository)
extends BaseUseCase[RequestCreateTax, ResponseCreateTax]:

  override def execute(request: RequestCreateTax) = 
    ZIO.succeed{
      val tax = Tax(name = request.name, description = request.description, value = request.value)
      ZIO.succeed(ResponseCreateTax(taxRepository.insertTax(tax)))
    }.flatten
