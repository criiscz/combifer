// package shared.mapper.open_api

// import sttp.tapir.docs.openapi.OpenAPIDocsInterpreter
// import sttp.apispec.openapi.OpenAPI
// import sttp.apispec.openapi.circe.yaml._
// import akka.http.javadsl.server.Route
// import sttp.tapir.Endpoint

// class OpenAPIGenerator(val endpoints: Endpoint[Unit, _, _, _, _]):
//   val docs: OpenAPI = OpenAPIDocsInterpreter.apply().toOpenAPI(endpoints, "My Bookshop", "1.0")
//   println(docs.toYaml)
