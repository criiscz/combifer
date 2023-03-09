package shared.responses

case class PaginatedResponse[A](
  data: List[A],
  meta: Meta
)
  
case class Meta (
    currentPage: Int,
    lastPage: Int,
    from: Int,
    to: Int,
    total: Long
) 
