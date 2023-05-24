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
      for
        order <- ZIO.attempt(orderRepository.insertOrder(
          Order (
            createDate = LocalDate.now(),
            receiveDate = None,
            description = request.description,
            employeeId = user.agentId
          )
        ))
        products <- ZIO.foreachPar(request.products)(insertProductOrder(_, order.id))
      yield (ResponseCreateOrder(order, products))
    }.flatten

  private def insertProductOrder(productInfo: OrderProductInformation, orderId:Long) = 
    ZIO.attempt {
      for
        lot <- ZIO.attempt(resolveProductLot(productInfo))
        product <- ZIO.attempt(productRepository.getProduct(productInfo.productId))
        orderProduct <- ZIO.attempt {
          orderProductRepository.insertOrderProduct(
            OrderProduct(
              productQuantity = productInfo.quantity,
              productUnitPrice = productInfo.baseUnitPrice,
              productName = product.get.name,
              orderId,
              productLotId = lot.id
            )
          )
        }
      yield (orderProduct)
    }.flatten

  private def resolveProductLot(productInfo: OrderProductInformation): ProductLot =
    productInfo.lotId match
      case None => productLotRepository.insertLot(
        ProductLot (
          price = productInfo.unitPrice,
          enterDate = LocalDate.now(),
          emptynessDate = None,
          quantity = productInfo.quantity,
          productId = productInfo.productId,
          basePrice = productInfo.baseUnitPrice
        )
      )
      case Some(value) =>  productLotRepository
          .getLot(value)
          .getOrElse(
            resolveProductLot(productInfo.copy(lotId = None))
      )
