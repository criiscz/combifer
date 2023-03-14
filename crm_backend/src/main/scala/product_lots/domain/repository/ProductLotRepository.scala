package product_lots.domain.repository

import product_lots.domain.entity.ProductLot

trait ProductLotRepository:
  def getProduct(id: Long): Option[ProductLot]
