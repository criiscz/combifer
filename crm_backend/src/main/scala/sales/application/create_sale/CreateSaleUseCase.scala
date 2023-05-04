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

class CreateSaleUseCase 
(user:UserContext) 
(using 
  saleRepository: SaleRepository, 
  saleProductRepository: SaleProductRepository,
  authenticationRepository: AuthenticationRepository,
  productLotRepository: ProductLotRepository)
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
          saleRepository.insertSale (
            Sale( description = request.description, clientId = request.clientId, employeeId = employeeAgent.id)
          )
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
        hasEnought <-
          if(productLot(0).quantity >= soldProduct.quantity)
            ZIO.succeed(true)
          else
            ZIO.fail(s"No enougth amount of product ${productLot(1).name}")
      yield(productLot(0), productLot(1), soldProduct)
