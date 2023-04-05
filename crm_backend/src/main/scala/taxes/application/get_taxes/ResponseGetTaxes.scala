package taxes.application.get_taxes

import shared.responses._
import taxes.domain.entity.Tax

sealed class ResponseGetTaxes(
  data:List[Tax],
  request: RequestGetTaxes,
  total: Long
) extends PaginatedResponse[Tax](
  data,
  Meta(
    currentPage = request.page,
    lastPage= request.page,
    from =  request.page,
    to = request.page,
    total = total
  )
)
