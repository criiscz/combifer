package sales.application.get_sale

import sales.domain.entity.Sale
import agents.domain.entity.Agent

case class ResponseGetSale(
  sale: Sale,
  employee: Agent,
  client: Agent
)
