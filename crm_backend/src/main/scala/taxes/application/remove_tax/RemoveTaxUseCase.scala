package taxes.application.remove_tax

import taxes.domain.repository.TaxRepository
import shared.application.BaseUseCase
import zio.Task
import zio.ZIO

class RemoveTaxUseCase()
(using taxRepository: TaxRepository)
extends BaseUseCase[RequestRemoveTax, ResponseRemoveTax]:

  override def execute(request: RequestRemoveTax): Task[ResponseRemoveTax] =
    ZIO.succeed{
      val removed = taxRepository.removeTax(request.id)
      ZIO.succeed(ResponseRemoveTax(removed))
    }.flatten
