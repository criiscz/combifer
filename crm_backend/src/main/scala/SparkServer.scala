import org.apache.spark.sql._

object SparkServer:
  val spark = SparkSession
    .builder
    .appName("Smart Inventory")
    .config("spark.master", "local")
    .getOrCreate()


