package order_products.domain.entity

case class OrderProduct (
  id: Long = -1,
  productQuantity: Long, 
  productUnitPrice: Double,
  productName: String,
  orderId: Long,
  productLotId: Long
)
