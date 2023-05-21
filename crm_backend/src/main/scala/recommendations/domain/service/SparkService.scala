package recommendations.domain.service

import org.apache.spark.sql._
import recommendations.domain.entity.RatingProductClient
import recommendations.domain.entity.RecommendationProduct

trait SparkService:
  def generateDataFrame(data: List[RatingProductClient]): DataFrame
  def traitALSModel(dataframe:DataFrame):List[RecommendationProduct]
