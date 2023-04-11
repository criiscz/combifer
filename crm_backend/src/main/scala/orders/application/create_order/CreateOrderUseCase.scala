package orders.application.create_order

import shared.application.BaseUseCase
import zio._
import orders.domain.repository.OrderRepository

class CreateOrderUseCase()
(using orderRepository: OrderRepository)
extends BaseUseCase[RequestCreateOrder, ResponseCreateOrder]:

  override def execute(request: RequestCreateOrder): Task[ResponseCreateOrder] = 
    ZIO.succeed{
      ResponseCreateOrder("asd")
    }
