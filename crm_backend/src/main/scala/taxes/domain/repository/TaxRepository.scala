package taxes.domain.repository

import taxes.domain.entity.Tax

trait TaxRepository:
  def getTax(id:Long): Option[Tax]
  def getTaxes(from:Int, to:Int): List[Tax]
  def getTotalAmountOfTaxes(): Long
  def insertTax(tax: Tax): Tax
  def updateTax(tax: Tax): Tax
  def removeTax(id: Long): Tax
