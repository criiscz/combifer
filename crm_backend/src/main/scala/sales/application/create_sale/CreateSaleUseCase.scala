package sales.application.create_sale

import zio._

import shared.application.BaseUseCase
import sales.domain.repository.SaleRepository
import sale_products.domain.repository.SaleProductRepository
import sales.domain.entity.Sale
import authentications.domain.entity.UserContext
import product_lots.domain.repository.ProductLotRepository
import sale_products.domain.entity.SaleProduct

class CreateSaleUseCase 
(user:UserContext) 
(using 
  saleRepository: SaleRepository, 
  saleProductRepository: SaleProductRepository,
  productLotRepository: ProductLotRepository)
extends BaseUseCase[RequestCreateSale, ResponseCreateSale]:

  override def execute(request: RequestCreateSale): Task[ResponseCreateSale] = 
    ZIO.succeed {
      val sale = saleRepository.insertSale (
        Sale( description = request.description, clientId = request.clientId, employeeId = user.id)
      )
      val soldProducts = 
        ZIO.foreachPar(request.products) (saveSaleProduct(_, sale.id))

      ResponseCreateSale(sale)
    }

  private def saveSaleProduct(soldProduct: SaleProductInformation,saleId: Long) = 
    ZIO.succeed {
      for
        (lot, product) <- productLotRepository.getLotWithProduct(soldProduct.lotId)
      yield(
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
    }
