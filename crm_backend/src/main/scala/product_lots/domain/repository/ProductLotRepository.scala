package product_lots.domain.repository

import product_lots.domain.entity.ProductLot
import category_products.domain.entity.CategoryProduct
import locations.domain.entity.Location
import products.domain.entity.Product

trait ProductLotRepository:
  def getLot(id: Long): Option[ProductLot]
  def getLotWithProduct(id: Long): Option[(ProductLot,Product)]
  def getLotInventory(id:Long): Option[(ProductLot, Product, CategoryProduct, Location)]
  def getLots(from:Int, to:Int): List[ProductLot]
  def getLotsOfProduct(productId: Long, from:Int, to:Int): List[ProductLot]
  def getTotalAmountOfLots():Long
  def getTotalAmountOfLotsAtProduct(productId:Long):Long
  def insertLot(lot:ProductLot): ProductLot
  def updateLot(lot:ProductLot): ProductLot
  def removeLot(id:Long): ProductLot
