package recommendations.infrastructure.service

import recommendations.domain.service.SparkService
import recommendations.domain.entity.RatingProductClient

import org.apache.spark.sql._
import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.recommendation.ALS

class SparkServiceImpl extends SparkService:

  override val spark: SparkSession = 
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

  override def traitALSModel(dataframe:DataFrame):Unit = 
    val Array(training, test) = dataframe.randomSplit(Array(0.8, 0.2))
    training.show()
    test.show()
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

    val clientRecomendations = model.recommendForAllUsers(10)
    clientRecomendations.show()
