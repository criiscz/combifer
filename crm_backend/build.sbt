val scala3Version = "3.2.2"

libraryDependencySchemes += "com.softwaremill.sttp.apispec" %% "openapi-model" % "early-semver"
libraryDependencySchemes += "com.softwaremill.sttp.apispec" %% "apispec-model" % "early-semver"

val zioVersion = "2.0.9"
val zioHttpVersion = "0.0.4"
val tapirVersion = "1.2.10"

val zioDependencies = Seq(
  "dev.zio" %% "zio" % zioVersion,
  "dev.zio" %% "zio-http" % zioHttpVersion
)

val tapirDependencies = Seq(
  "com.softwaremill.sttp.tapir" %% "tapir-zio" % tapirVersion,
  "com.softwaremill.sttp.tapir" %% "tapir-zio-http-server" % tapirVersion,
  "com.softwaremill.sttp.tapir" %% "tapir-json-circe" % tapirVersion,
  "com.softwaremill.sttp.tapir" %% "tapir-swagger-ui-bundle" % tapirVersion 
)

val testingDependencies = Seq(
  "org.scalameta" %% "munit" % "0.7.29" % Test,
  "com.h2database" % "h2" % "2.1.214" % Test
)

val quillDependencies = Seq(
  "io.getquill" %% "quill-jdbc-zio" % "4.6.0.1",
  "org.postgresql" % "postgresql" % "42.5.4",
  "org.slf4j" % "slf4j-nop" % "1.7.32",
)

val authDependencies = Seq(
  "com.github.jwt-scala" %% "jwt-core" % "9.2.0",
  ("com.github.t3hnar" %% "scala-bcrypt" % "4.3.0").cross(CrossVersion.for3Use2_13)
)

lazy val root = project
.in(file("."))
.settings(
    name := "crm_backend",
    version := "0.1.0-SNAPSHOT",
    scalaVersion := scala3Version,

    libraryDependencies ++= zioDependencies,
    libraryDependencies ++= quillDependencies,
    libraryDependencies ++= tapirDependencies,
    libraryDependencies ++= authDependencies,
    libraryDependencies ++= testingDependencies,
  )

assemblyMergeStrategy in assembly := {
  case PathList("META-INF", "maven", "org.webjars", "swagger-ui", "pom.properties") =>
    MergeStrategy.singleOrError
  case PathList("META-INF", "resources", "webjars", "swagger-ui", xs@_*) =>
    MergeStrategy.first
  case PathList("META-INF", _*) => MergeStrategy.discard
  case _                        => MergeStrategy.first
}
assemblyJarName in assembly := "back.jar"
