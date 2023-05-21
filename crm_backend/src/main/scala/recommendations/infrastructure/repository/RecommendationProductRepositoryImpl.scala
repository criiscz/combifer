package recommendations.infrastructure.repository

import recommendations.domain.repository.RecommendationProductRepository
import shared.BaseRepository
import product_lots.domain.entity.ProductLot
import recommendations.domain.entity._

import zio._
import scala.quoted.Quotes
import io.getquill._

import sales.domain.entity.Sale
import products.domain.entity.Product
import sale_products.domain.entity.SaleProduct
import agents.domain.entity.Agent
import zio.prelude.newtypes.Prod

class RecommendationProductRepositoryImpl extends RecommendationProductRepository with BaseRepository:

  import ctx._

  override def getRecommendationsForClient(clientId: Long): List[(RecommendationProduct, Product)] =
    val q = quote {
      for
        recommendation <- query[RecommendationProduct].filter(_.clientId == lift(clientId))
        product <- query[Product].filter(_.id  == recommendation.productId)
      yield (recommendation, product)
    } 
    ctx.run(q)

  override def getProductsBoughtByClient(): List[RatingProductClient] =
    val data = quote {
      for 
        agent <- query[Agent]
        sale <- query[Sale].join(_.clientId == agent.idDocument)
        saleProducts <- query[SaleProduct].join(_.saleId == sale.id)
        productLots <- query[ProductLot].join(_.id == saleProducts.productLotId)
        product <- query[Product].join(_.id == productLots.productId)
      yield (agent, product)
    }
    val ratedData = quote {
      data
      .groupBy(item => (item._2.id, item._1.idDocument))
      .map { 
        case (data, query) => 
          (data._1, data._2, query.size)
      }
    }
    ctx.run(ratedData)
      .map(data => 
        RatingProductClient(
          productId = data._1,
          clientId = data._2,
          rating = data._3
        )
      )

  override def insertRecommendationsList(recommendations: List[RecommendationProduct]): List[RecommendationProduct] =
    val q = quote {
      liftQuery(recommendations)
        .foreach(d =>
          query[RecommendationProduct]
            .insertValue(d)
            .returning(r => r)
        )
    }
    ctx.run(q)
