package orders.application.create_order

import shared.application.BaseUseCase
import zio._
import orders.domain.repository.OrderRepository
import order_products.domain.repository.OrderProductRepository
import orders.domain.entity.Order
import java.time.LocalDate
import authentications.domain.entity.UserContext
import product_lots.domain.repository.ProductLotRepository
import product_lots.domain.entity.ProductLot
import order_products.domain.entity.OrderProduct
import products.domain.repository.ProductRepository

class CreateOrderUseCase(user:UserContext)
(using 
  orderRepository: OrderRepository,
  orderProductRepository: OrderProductRepository,
  productLotRepository: ProductLotRepository,
  productRepository: ProductRepository
  )
extends BaseUseCase[RequestCreateOrder, ResponseCreateOrder]:

  override def execute(request: RequestCreateOrder): Task[ResponseCreateOrder] = 
    ZIO.succeed{
      val order = orderRepository.insertOrder(
        Order (
          createDate = LocalDate.now(),
          receiveDate = None,
          description = request.description,
          employeeId = user.agentId
        )
      )
      val products = 
        ZIO.foreachPar(request.products)(insertProductOrder(_, order.id))
      ResponseCreateOrder(order)
    }

  private def insertProductOrder(productInfo: OrderProductInformation, orderId:Long) = 
    ZIO.succeed {
      for 
       lot <- ZIO.succeed(resolveProductLot(productInfo))
       product <- ZIO.succeed(productRepository.getProduct(productInfo.productId))
      yield (
        orderProductRepository.insertOrderProduct(
          OrderProduct(
            productQuantity = productInfo.quantity,
            productUnitPrice = productInfo.unitPrice,
            productName = product.get.name,
            orderId, 
            productLotId = lot.id
          )
        )
      )
    }

  private def resolveProductLot(productInfo: OrderProductInformation): ProductLot =
    productInfo.lotId match
    case None => productLotRepository.insertLot(
      ProductLot (
        price = productInfo.unitPrice,
        enterDate = LocalDate.now(),
        emptynessDate = None,
        quantity = 0,
        productId = productInfo.productId
      )
    )
    case Some(value) =>  productLotRepository
      .getLot(value)
      .getOrElse(
        resolveProductLot(productInfo.copy(lotId = None))
      )
