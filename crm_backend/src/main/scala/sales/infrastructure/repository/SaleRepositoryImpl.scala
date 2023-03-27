package sales.infrastructure.repository

import sales.domain.repository.SaleRepository
import sales.domain.entity.Sale
import shared.BaseRepository

class SaleRepositoryImpl extends SaleRepository with BaseRepository:

  override def getSale(id: Long): Option[Sale] = 
    None
