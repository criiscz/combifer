package taxes.application.update_tax

import shared.application.BaseUseCase
import taxes.domain.repository.TaxRepository
import zio.Task
import zio.ZIO
import taxes.domain.entity.Tax

class UpdateTaxUseCase(id:Long)
(using taxRepository: TaxRepository)
extends BaseUseCase[RequestUpdateTax, ResponseUpdateTax]:

  override def execute(request: RequestUpdateTax): Task[ResponseUpdateTax] = 
    ZIO.succeed{
      val updated = taxRepository.updateTax(
        Tax (
          id = id,
          name = request.name,
          description = request.description,
          value = request.value
        )
      )
      ZIO.succeed(ResponseUpdateTax(updated))
    }.flatten
