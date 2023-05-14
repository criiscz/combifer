package utils

import java.util.Properties
import scala.io.Source
import java.io.FileInputStream

object Configuration:

  private var isInitilized = false
  private lazy val properties = Properties()

  def init() =
    val inputStream:FileInputStream = new FileInputStream("src/main/resources/application.properties");
    properties.load(inputStream);
    inputStream.close();
    isInitilized = true

  def get(propertyName: String): Option[String] =
    properties.getProperty(propertyName) match
      case property:String => Some(property)
      case null => {
        println(s"Error, can't find $propertyName in the properties file")
        None
      }
