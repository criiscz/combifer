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
