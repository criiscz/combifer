package sales.domain.repository

import sales.domain.entity.Sale

trait SaleRepository:
  def getSale(id:Long): Option[Sale]
