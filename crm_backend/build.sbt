val scala3Version = "3.2.2"

ThisBuild / scalaVersion := scala3Version
ThisBuild / version := "1.0"
ThisBuild / organization := "com.nojipiz"

val unnamedJavaOptions = List(
  "-XX:+IgnoreUnrecognizedVMOptions",
  "--add-opens=java.base/java.lang=ALL-UNNAMED",
  "--add-opens=java.base/java.lang.invoke=ALL-UNNAMED",
  "--add-opens=java.base/java.lang.reflect=ALL-UNNAMED",
  "--add-opens=java.base/java.io=ALL-UNNAMED",
  "--add-opens=java.base/java.net=ALL-UNNAMED",
  "--add-opens=java.base/java.nio=ALL-UNNAMED",
  "--add-opens=java.base/java.util=ALL-UNNAMED",
  "--add-opens=java.base/java.util.concurrent=ALL-UNNAMED",
  "--add-opens=java.base/java.util.concurrent.atomic=ALL-UNNAMED",
  "--add-opens=java.base/sun.nio.ch=ALL-UNNAMED",
  "--add-opens=java.base/sun.nio.cs=ALL-UNNAMED",
  "--add-opens=java.base/sun.security.action=ALL-UNNAMED",
  "--add-opens=java.base/sun.util.calendar=ALL-UNNAMED",
  "--add-opens=java.security.jgss/sun.security.krb5=ALL-UNNAMED"
)

libraryDependencySchemes += "com.softwaremill.sttp.apispec" %% "openapi-model" % "early-semver"
libraryDependencySchemes += "com.softwaremill.sttp.apispec" %% "apispec-model" % "early-semver"

val zioVersion = "2.0.10"
val zioHttpVersion = "0.0.4"
val tapirVersion = "1.2.10"
val sparkVersion = "3.3.2"

val sparkDependencies = Seq(
  ("org.apache.spark" %% "spark-core" % sparkVersion),
  ("org.apache.spark" %% "spark-mllib" % sparkVersion),
  ("org.apache.spark" %% "spark-sql" % sparkVersion)
)
.map(
  _.exclude("org.scala-lang.modules","scala-collection-compat_2.13")
  .exclude("org.typelevel", "cats-kernel_2.13")
  .cross(CrossVersion.for3Use2_13)
) 

val sparkCompatDependencies = Seq(
  "io.github.vincenzobaz" %% "spark-scala3" % "0.1.6",
  "org.apache.logging.log4j" % "log4j-core" % "2.20.0",
  //"org.apache.logging.log4j" % "log4j-to-slf4j" % "2.20.0" // -> Only inlude in assembly
)

val zioDependencies = Seq(
  "dev.zio" %% "zio" % zioVersion,
  "dev.zio" %% "zio-http" % zioHttpVersion,
  "dev.zio" %% "zio-logging" % "2.1.12"
)

val tapirDependencies = Seq(
  "com.softwaremill.sttp.tapir" %% "tapir-zio" % tapirVersion,
  "com.softwaremill.sttp.tapir" %% "tapir-zio-http-server" % tapirVersion,
  "com.softwaremill.sttp.tapir" %% "tapir-json-circe" % tapirVersion,
  "com.softwaremill.sttp.tapir" %% "tapir-swagger-ui-bundle" % tapirVersion 
)

val testingDependencies = Seq(
  "dev.zio" %% "zio-test"          % zioVersion % Test,
  "dev.zio" %% "zio-test-sbt"      % zioVersion % Test,
  "dev.zio" %% "zio-test-magnolia" % zioVersion % Test,
  ("io.github.etspaceman" %% "scalacheck-faker" % "7.0.0").cross(CrossVersion.for3Use2_13)
)

val quillDependencies = Seq(
  "io.getquill" %% "quill-jdbc-zio" % "4.6.0.1",
  "org.postgresql" % "postgresql" % "42.5.4",
)

val authDependencies = Seq(
  "com.github.jwt-scala" %% "jwt-core" % "9.2.0",
  ("com.github.t3hnar" %% "scala-bcrypt" % "4.3.0").cross(CrossVersion.for3Use2_13)
)

val emailDependencies = Seq(
  "com.github.daddykotex" %% "courier" % "3.2.0"
)

lazy val root = project
.in(file("."))
.settings(
    name := "crm_backend",
    version := "1.0",

    libraryDependencies ++= zioDependencies,
    libraryDependencies ++= quillDependencies,
    libraryDependencies ++= tapirDependencies,
    libraryDependencies ++= authDependencies,
    libraryDependencies ++= sparkDependencies,
    libraryDependencies ++= sparkCompatDependencies,
    libraryDependencies ++= emailDependencies,
    libraryDependencies ++= testingDependencies,

    run / fork := true,
    run / javaOptions ++= unnamedJavaOptions
 )

testFrameworks += new TestFramework("zio.test.sbt.ZTestFramework")

assembly / assemblyMergeStrategy := {
  case path if path.contains("META-INF/services") =>
    MergeStrategy.concat
  case PathList("META-INF", "maven", "org.webjars", "swagger-ui", "pom.properties") =>
    MergeStrategy.singleOrError
  case PathList("META-INF", "resources", "webjars", "swagger-ui", xs@_*) =>
    MergeStrategy.first
  case PathList("META-INF", "MANIFEST.MF") => MergeStrategy.discard
  case _                        => MergeStrategy.first
}

assembly / assemblyJarName := "back.jar"
