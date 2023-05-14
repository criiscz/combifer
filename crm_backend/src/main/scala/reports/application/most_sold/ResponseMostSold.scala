package reports.application.most_sold

import reports.domain.entity.SoldProductInformation

case class ResponseMostSold (
  data: List[SoldProductInformation]
)
