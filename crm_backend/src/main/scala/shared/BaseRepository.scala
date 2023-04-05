package shared

import io.getquill._
import io.getquill.context.jdbc.JdbcContext

import product_lots.domain.entity.ProductLot
import locations.domain.entity.Location
import category_products.domain.entity.CategoryProduct
import products.domain.entity.Product
import authentications.domain.entity.User
import agents.domain.entity.Agent
import taxes.domain.entity.Tax
import sale_products.domain.entity.SaleProduct
import sales.domain.entity.Sale
import orders.domain.entity.Order
import order_products.domain.entity.OrderProduct

trait BaseRepository:
  val ctx = new PostgresJdbcContext(SnakeCase, "productionDatabase")

  implicit val productLotTableName:SchemaMeta[ProductLot] = 
    schemaMeta[ProductLot]("product_lots")
  implicit val productLotExcludeInsert:InsertMeta[ProductLot] =
    insertMeta[ProductLot](_.id)
  implicit val productLotExcludeUpdate:UpdateMeta[ProductLot] = 
    updateMeta[ProductLot](_.id)

  implicit val locationTableName:SchemaMeta[Location] = 
    schemaMeta[Location]("locations")
  implicit val excludeLocationInsert:InsertMeta[Location] =
    insertMeta[Location](_.id)
  implicit val excludeLocationUpdate:UpdateMeta[Location] = 
    updateMeta[Location](_.id)

  implicit val categoryTableName:SchemaMeta[CategoryProduct] = 
    schemaMeta[CategoryProduct]("category_products")
  implicit val excludeCategoryInsert:InsertMeta[CategoryProduct] = 
    insertMeta[CategoryProduct](_.id)
  implicit val excludeCategoryUpdate:UpdateMeta[CategoryProduct] = 
    updateMeta[CategoryProduct](_.id)

  implicit val productTableName:SchemaMeta[Product] = 
    schemaMeta[Product]("products")
  implicit val excludeProductInsert:InsertMeta[Product] =
    insertMeta[Product](_.id)
  implicit val excludeProductUpdate:UpdateMeta[Product] = 
    updateMeta[Product](_.id)

  implicit val userTableName:SchemaMeta[User] = 
    schemaMeta[User]("users")
  implicit val excludeUserInsert:InsertMeta[User] =
    insertMeta[User](_.id)
  implicit val excludeUserUpdate:UpdateMeta[User] = 
    updateMeta[User](_.id)

  implicit val agentsTableName:SchemaMeta[Agent] = 
    schemaMeta[Agent]("agents")

  implicit val taxesTableName:SchemaMeta[Tax] = 
    schemaMeta[Tax]("taxes")
  implicit val excludeTaxInsert:InsertMeta[Tax] =
    insertMeta[Tax](_.id)
  implicit val excludeTaxUpdate:UpdateMeta[Tax] = 
    updateMeta[Tax](_.id)

  implicit val saleProductTableName:SchemaMeta[SaleProduct] = 
    schemaMeta[SaleProduct]("sale_products")
  implicit val saleProductInsert:InsertMeta[SaleProduct] =
    insertMeta[SaleProduct](_.id)
  implicit val saleProductUpdate:UpdateMeta[SaleProduct] = 
    updateMeta[SaleProduct](_.id)

  implicit val saleTableName:SchemaMeta[Sale] = 
    schemaMeta[Sale]("sales")
  implicit val saleInsert:InsertMeta[Sale] =
    insertMeta[Sale](_.id)
  implicit val saleUpdate:UpdateMeta[Sale] = 
    updateMeta[Sale](_.id)

  implicit val orderTableName:SchemaMeta[Order] = 
    schemaMeta[Order]("orders")
  implicit val ordersInsert:InsertMeta[Order] =
    insertMeta[Order](_.id)
  implicit val orderUpdate:UpdateMeta[Order] = 
    updateMeta[Order](_.id)

  implicit val orderProductTableName:SchemaMeta[OrderProduct] = 
    schemaMeta[OrderProduct]("order_products")
  implicit val ordersProductInsert:InsertMeta[OrderProduct] =
    insertMeta[OrderProduct](_.id)
  implicit val orderProductUpdate:UpdateMeta[OrderProduct] = 
    updateMeta[OrderProduct](_.id)
