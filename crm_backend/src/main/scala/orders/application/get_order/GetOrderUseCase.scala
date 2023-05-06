package orders.application.get_order

import shared.application.BaseUseCase
import zio._
import orders.domain.repository.OrderRepository
import order_products.domain.repository.OrderProductRepository

class GetOrderUseCase
(using
  orderRepository: OrderRepository,
  orderProductRepository: OrderProductRepository
)
extends BaseUseCase[RequestGetOrder, ResponseGetOrder]:

  override def execute(request: RequestGetOrder): Task[ResponseGetOrder] =
    for
      orderInfo <- ZIO.fromOption(orderRepository.getOrder(request.orderId))
        .mapError(e => Throwable("Can't find order info"))
      orderProducts <- ZIO.succeed(orderProductRepository.getProductsOfOrderId(request.orderId))
    yield (
      ResponseGetOrder(
        orderInfo(0),
        orderInfo(1),
        orderProducts
      )
    )
