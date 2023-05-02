package orders.application.get_orders

import shared.application.BaseUseCase
import zio._
import orders.domain.repository.OrderRepository

class GetOrdersUseCase
(using orderRepository: OrderRepository)
extends BaseUseCase[RequestGetOrders, ResponseGetOrders]:

  override def execute(request: RequestGetOrders): Task[ResponseGetOrders] =
    for
      orders <- ZIO.succeed(orderRepository.getOrders(request.from, request.to))
      totalOrders <- ZIO.succeed(orderRepository.getTotalAmountOfOrders())
    yield(
      ResponseGetOrders(
        data = orders,
        request = request,
        total = totalOrders
      )
    )
