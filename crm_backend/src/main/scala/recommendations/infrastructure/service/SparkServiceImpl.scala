package recommendations.infrastructure.service

import recommendations.domain.service.SparkService
import recommendations.domain.entity.RatingProductClient

import org.apache.spark.sql._
import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.recommendation.ALS
import recommendations.domain.entity.RecommendationProduct
import java.time.LocalDate

import io.circe.generic.auto._
import io.circe.parser._
import scala.collection.mutable.AbstractSeq
import scala.collection.mutable.ArraySeq
import org.apache.spark.sql.types.ObjectType
import org.apache.spark.sql.types.DataType
import org.apache.spark.serializer.Serializer
import org.apache.spark.sql.connector.expressions.Expression
import org.apache.spark.sql.catalyst.expressions.GenericRowWithSchema
import org.apache.spark.sql.catalyst.expressions.GenericRow
import org.apache.spark.sql.functions.*;
import scala.util.matching.Regex

class SparkServiceImpl extends SparkService:

  private val resultsPattern: Regex = """\{(\d+), ([\d.]+)\}""".r
  val spark: SparkSession = 
    SparkSession
    .builder
    .appName("Smart Inventory")
    .config("spark.master", "local")
    .getOrCreate()

  override def generateDataFrame(data: List[RatingProductClient]): DataFrame = 
    import spark.implicits.localSeqToDatasetHolder
    import scala3encoders.given

    extension [T: Encoder](seq: Seq[T])
      def toDS: Dataset[T] =
        localSeqToDatasetHolder(seq).toDS

    spark.createDataset(
      spark
      .sparkContext
      .parallelize(data)
    ).toDF

  trait Serializer[T]:
    def inputType: DataType
    def serialize(inputObject: Expression): Expression

  override def traitALSModel(dataframe:DataFrame): List[RecommendationProduct] =
    import spark.implicits.localSeqToDatasetHolder
    import scala3encoders.encoder

    given Serializer[ArraySeq[(Long, Float)]] with
      def inputType: DataType = ObjectType(classOf[ArraySeq[(Long, Float)]])
      def serialize(inputObject: Expression): Expression = inputObject

    val Array(training, test) = dataframe.randomSplit(Array(0.8, 0.2))
    val als = new ALS()
      .setMaxIter(5)
      .setRegParam(0.01)
      .setUserCol("clientId")
      .setItemCol("productId")
      .setRatingCol("rating")
    val model = als.fit(training)
    model.setColdStartStrategy("drop")

    val predictions = model.transform(test)
    val evaluator = new RegressionEvaluator()
      .setMetricName("rmse")
      .setLabelCol("rating")
      .setPredictionCol("prediction")

    val rmse = evaluator.evaluate(predictions)
    println(s"Root-mean-square error = $rmse")

    val clientRecomendations = model.recommendForAllUsers(5)
    clientRecomendations.show()

    clientRecomendations
      .withColumn("recommendations", col("recommendations").cast("string"))
      .collect()
      .toList
      .map { row =>
        PreRecommendationProduct(row.getAs[Int]("clientId"), row.getAs[String]("recommendations"))
      }.flatMap { prerecommendation =>
        val clientId = prerecommendation.clientId
        resultsPattern.findAllMatchIn(prerecommendation.recommendations).map { matchResult =>
          RecommendationProduct(
            clientId = clientId,
            productId = matchResult.group(1).toInt,
            recommendedRate = matchResult.group(2).toFloat
          )
        }
      }

case class PreRecommendationProduct(
  clientId: Int,
  recommendations:String
)
