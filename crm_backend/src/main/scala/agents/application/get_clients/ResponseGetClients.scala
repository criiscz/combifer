package agents.application.get_clients

import agents.domain.entity.Agent
import shared.responses.PaginatedResponse
import shared.responses.Meta

sealed class ResponseGetClients (
  data:List[Agent],
  request: RequestGetClients,
  total: Long
) extends PaginatedResponse[Agent](
  data,
  Meta(
    currentPage = request.page,
    lastPage= request.page,
    from =  request.page,
    to = request.page,
    total = total
  )
)
