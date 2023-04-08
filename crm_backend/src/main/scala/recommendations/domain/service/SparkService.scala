package recommendations.domain.service

import org.apache.spark.sql._
import recommendations.domain.entity.RatingProductClient

trait SparkService:
  val spark: SparkSession
  def generateDataFrame(data: List[RatingProductClient]): DataFrame
  def traitALSModel(dataframe:DataFrame):Unit
