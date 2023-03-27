package sales.domain.entity

import java.time.LocalDate

case class Sale (
  id: Long, 
  creationDate: LocalDate,
  description: Option[String],
  agentId: Long
)
