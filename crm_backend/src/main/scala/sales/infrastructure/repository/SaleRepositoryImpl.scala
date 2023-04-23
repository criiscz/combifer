package sales.infrastructure.repository

import io.getquill._

import sales.domain.repository.SaleRepository
import sales.domain.entity.Sale
import shared.BaseRepository
import sale_products.domain.entity.SaleProduct
import agents.domain.entity.Agent

class SaleRepositoryImpl extends SaleRepository with BaseRepository:

  import ctx._

  override def getSale(id: Long): Option[(Sale, Agent, Agent)]= 
    val q = quote {
      for 
        sale <- query[Sale].filter(_.id == lift(id))
        employee <- 
          query[Agent]
            .join(_.idDocument == sale.employeeId)
        client <- 
          query[Agent]
            .join(_.idDocument == sale.clientId)
      yield (sale, employee, client)
    }
    (ctx.run(q)).headOption

  override def insertSale(sale:Sale): Sale = 
    ctx.run(
      query[Sale]
        .insertValue(lift(sale))
        .returning(r => r)
    )
