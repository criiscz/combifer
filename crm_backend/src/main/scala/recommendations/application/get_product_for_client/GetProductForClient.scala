package recommendations.application.get_product_for_client

import shared.application.BaseUseCase
import zio._

class GetProductForClient extends BaseUseCase[RequestGetProductForClient,ResponseGetProductForClient]:

  override def execute(request: RequestGetProductForClient): Task[ResponseGetProductForClient] = 
    ZIO.succeed{
      ResponseGetProductForClient(null)
    }
