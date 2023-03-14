package product_lots.domain.repository

import product_lots.domain.entity.ProductLot

trait ProductLotRepository:
  def getLot(id: Long): Option[ProductLot]
  def getLots(from:Int, to:Int): List[ProductLot]
  def getLotsOfProduct(productId: Long, from:Int, to:Int): List[ProductLot]
  def getTotalAmountOfLots():Long
  def getTotalAmountOfLotsAtProduct(productId:Long):Long
  def insertLot(lot:ProductLot): Unit
  def updateLot(lot:ProductLot): Unit
  def removeLot(id:Long): Unit
