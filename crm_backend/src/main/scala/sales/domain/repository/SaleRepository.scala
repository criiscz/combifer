package sales.domain.repository

import sales.domain.entity.Sale
import agents.domain.entity.Agent

trait SaleRepository:
  def getSale(id:Long): Option[(Sale, Agent, Agent)]
  def insertSale(sale:Sale): Sale
  def getSales(from: Int, to:Int): List[Sale]
  def getTotalAmountOfSales():Long
