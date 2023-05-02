package sale_products.domain.repository

import sale_products.domain.entity.SaleProduct

trait SaleProductRepository:
  def getSoldProductsOfLot(lotId: Long, from: Int, to:Int): List[SaleProduct]
  def getSoldProductsOfProduct(productId: Long, from: Int, to:Int): List[SaleProduct]
  def getSoldProductsOfSale(saleId: Long, from: Int = 0, to:Int = Int.MaxValue): List[SaleProduct]
  def insertSaleProduct(saleProduct:SaleProduct): SaleProduct
  def updateSaleProduct(saleProduct:SaleProduct): SaleProduct
