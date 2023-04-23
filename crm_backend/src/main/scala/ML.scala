import org.apache.spark.sql._
import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.recommendation.ALS

object ML:
  val spark: SparkSession = 
    SparkSession
    .builder
    .appName("Smart Inventory")
    .config("spark.master", "local")
    .getOrCreate()


