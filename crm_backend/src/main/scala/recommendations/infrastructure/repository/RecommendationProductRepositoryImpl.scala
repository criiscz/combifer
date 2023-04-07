package recommendations.infrastructure.repository

import recommendations.domain.repository.RecommendationProductRepository
import shared.BaseRepository
import product_lots.domain.entity.ProductLot
import recommendations.domain.entity.RecommendationProduct

import zio._
import scala.quoted.Quotes
import io.getquill._

class RecommendationProductRepositoryImpl extends RecommendationProductRepository with BaseRepository:

  import ctx._

  override def getRecommendationsForClient(clientId: Long): List[(RecommendationProduct, Product)] =
    val q = quote {
      for
        recommendation <- query[RecommendationProduct].filter(_.clientId == lift(clientId))
        product <- query[RecommendationProduct].filter(_.id  == recommendation.productId)
      yield (recommendation, product)
    } 
    ctx.run(q)
