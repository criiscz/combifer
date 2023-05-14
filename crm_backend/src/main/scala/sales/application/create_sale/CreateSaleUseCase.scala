package sales.application.create_sale

import zio._

import shared.application.BaseUseCase
import sales.domain.repository.SaleRepository
import sale_products.domain.repository.SaleProductRepository
import sales.domain.entity.Sale
import authentications.domain.entity.UserContext
import product_lots.domain.repository.ProductLotRepository
import sale_products.domain.entity.SaleProduct
import product_lots.domain.entity.ProductLot
import products.domain.entity.Product
import agents.domain.repository.AgentRepository
import authentications.domain.repository.AuthenticationRepository
import notifications.domain.service.EmailNotificationService

class CreateSaleUseCase 
(user:UserContext) 
(using 
  saleRepository: SaleRepository, 
  saleProductRepository: SaleProductRepository,
  authenticationRepository: AuthenticationRepository,
  productLotRepository: ProductLotRepository,
  emailNotificationService: EmailNotificationService)
extends BaseUseCase[RequestCreateSale, ResponseCreateSale]:

  override def execute(request: RequestCreateSale): Task[ResponseCreateSale] =
    ZIO.succeed {
      for
        quantities <- ZIO
          .foreachPar(request.products)(checkQuantitiesFromInventory(_))
          .mapError(e => Throwable(e.toString()))
        employeeAgent <- ZIO.fromOption(authenticationRepository.getUserById(user.id))
          .mapError(e => Throwable(e.toString()))
        sale <- ZIO.succeed(
          saleRepository.insertSale(Sale(description = request.description, clientId = request.clientId, employeeId = employeeAgent._2.idDocument))
        )
        saleProduct <- ZIO.foreachPar(quantities)(saveSaleProduct(_, sale.id))
      yield(ResponseCreateSale(sale))
    }.flatten

  private def saveSaleProduct(productInfo: (ProductLot, Product, SaleProductInformation), saleId: Long) =
    ZIO.succeed {
      val (lot, product, soldProduct) = productInfo
      for
        updatedLot <- ZIO.succeed(
          productLotRepository.updateLot(
            lot.copy(quantity = lot.quantity - soldProduct.quantity)
          )
        )
        saleProduct <- ZIO.succeed(
          saleProductRepository.insertSaleProduct(
            SaleProduct (
              productQuantity = soldProduct.quantity,
              productDiscount = soldProduct.discount,
              productMeasureUnit = product.measureUnit,
              productUnitPrice = lot.price,
              productName = product.name,
              productDescription = product.description,
              saleId = saleId,
              taxId = soldProduct.taxId,
              productLotId = lot.id
            )
          )
        )
      yield(saleProduct)
    }.flatten

  private def checkQuantitiesFromInventory(soldProduct: SaleProductInformation) =
    for
      productLot <- ZIO.fromOption(productLotRepository.getLotWithProduct(soldProduct.lotId))
      newAmount <- {
        val possibleAmount = productLot(0).quantity - soldProduct.quantity
        if(possibleAmount >= 0)
          ZIO.succeed(possibleAmount)
        else
          ZIO.fail(s"No enougth amount of product ${productLot(1).name}")
      }
      _ <- checkForLowInventory(productLot(0), productLot(1), newAmount)
    yield(productLot(0), productLot(1), soldProduct)

  private def checkForLowInventory(productLot: ProductLot, product: Product, productAmount: Long): IO[Throwable, Boolean] =
    productAmount match {
      case x if x < 5 =>
        emailNotificationService
          .sendNotificationToAdmins(generateMessage(productLot, product))
          .map(data => true)
    }

  private def generateMessage(productLot: ProductLot, product: Product): String =
    s"The product ${product.name} of lot ${productLot.id} is almost empty"
