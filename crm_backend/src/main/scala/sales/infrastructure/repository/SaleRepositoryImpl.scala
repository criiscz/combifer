package sales.infrastructure.repository

import io.getquill._

import sales.domain.repository.SaleRepository
import sales.domain.entity.Sale
import shared.BaseRepository
import sale_products.domain.entity.SaleProduct
import agents.domain.entity.Agent
import authentications.domain.entity.User

class SaleRepositoryImpl extends SaleRepository with BaseRepository:

  import ctx._

  override def getSale(id: Long): Option[(Sale, Agent, Agent)]= 
    val q = quote {
      for 
        sale <- query[Sale].filter(_.id == lift(id))
        employeeAgent <- query[User].filter(_.id == sale.employeeId)
        employee <- 
          query[Agent]
            .filter(_.idDocument == employeeAgent.agentId)
        client <- 
          query[Agent]
            .filter(_.idDocument == sale.clientId)
      yield (sale, employee, client)
    }
    (ctx.run(q)).headOption

  override def insertSale(sale:Sale): Sale = 
    ctx.run(
      query[Sale]
        .insertValue(lift(sale))
        .returning(r => r)
    )

  override def getSales(from: Int, to:Int): List[Sale] =
    ctx.run(
      query[Sale]
        .sortBy(_.id)(Ord.ascNullsLast)
        .take(lift(to))
        .drop(lift(from))
    )

  override def getTotalAmountOfSales():Long =
    ctx.run(
      query[Sale].size
    )
