package sales.application.create_sale

import shared.application.BaseUseCase
import zio.Task

class CreateSaleUseCase extends BaseUseCase[RequestCreateSale, ResponseCreateSale]:

  override def execute(request: RequestCreateSale): Task[ResponseCreateSale] = ???
