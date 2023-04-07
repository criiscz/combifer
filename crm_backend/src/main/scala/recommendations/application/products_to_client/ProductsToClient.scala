package recommendations.application.products_to_client

import shared.application.BaseUseCase
import zio._

class ProductsToClient extends BaseUseCase[RequestProductsToClient, ResponseProductsToClient]:

  override def execute(request: RequestProductsToClient): Task[ResponseProductsToClient] = 
    ZIO.succeed{
      ResponseProductsToClient(true)
    } 
