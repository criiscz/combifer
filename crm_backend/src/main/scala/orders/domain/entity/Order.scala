package orders.domain.entity

import java.time.LocalDate

case class Order (
  id: Long = -1,
  createDate: LocalDate,
  receiveDate: Option[LocalDate],
  description: Option[String],
  employeeId: Long
)
