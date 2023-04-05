package sales.domain.entity

import java.time.LocalDate

case class Sale (
  id: Long = -1, 
  creationDate: LocalDate = LocalDate.now(),
  description: Option[String],
  clientId: Long,
  employeeId: Long
)
