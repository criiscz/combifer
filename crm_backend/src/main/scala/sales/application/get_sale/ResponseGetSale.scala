package sales.application.get_sale

import sales.domain.entity.Sale
import agents.domain.entity.Agent
import sale_products.domain.entity.SaleProduct

case class ResponseGetSale (
  sale: Sale,
  employee: Agent,
  client: Agent,
  products: List[SaleProduct]
)
