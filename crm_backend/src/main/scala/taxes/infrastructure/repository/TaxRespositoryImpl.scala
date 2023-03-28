package taxes.infrastructure.repository

import zio._
import scala.quoted.Quotes
import io.getquill._

import taxes.domain.repository.TaxRepository
import taxes.domain.entity.Tax
import shared.BaseRepository

class TaxRespositoryImpl extends TaxRepository with BaseRepository:

  import ctx._

  override def getTax(id: Long): Option[Tax] =
    ctx.run(
      query[Tax]
        .filter(_.id == lift(id))
        .take(1)
    ).headOption

  override def getTaxes(from: Int, to: Int): List[Tax] = 
    ctx.run(
      query[Tax]
        .sortBy(x => x.id)(Ord.ascNullsLast)
        .drop(lift(from))
        .take(lift(to))
    )
    
  override def getTotalAmountOfTaxes(): Long = 
    ctx.run(
      query[Tax].size
    )

  override def insertTax(tax: Tax): Tax = 
    ctx.run(
      query[Tax]
        .insertValue(lift(tax))
        .returning(r => r)
    )
  override def updateTax(tax: Tax): Tax = 
    ctx.run(
      query[Tax]
        .filter(_.id == lift(tax.id))
        .updateValue(lift(tax))
        .returning(r => r)
      )

  override def removeTax(id: Long): Tax = 
    ctx.run(
      query[Tax]
        .filter(_.id == lift(id))
        .delete
        .returning(r => r)
    )
