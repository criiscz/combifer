package orders.application.get_order

import shared.application.BaseUseCase
import zio._
import orders.domain.repository.OrderRepository

class GetOrderUseCase
(using orderRepository: OrderRepository)
extends BaseUseCase[RequestGetOrder, ResponseGetOrder]:

  override def execute(request: RequestGetOrder): Task[ResponseGetOrder] =
    orderRepository.getOrder(request.orderId) match
      case None => ZIO.fail(new Throwable("Can't find order"))
      case Some(value) => ZIO.succeed(ResponseGetOrder(value(0)))
