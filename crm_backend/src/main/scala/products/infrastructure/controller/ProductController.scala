package products.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.ztapir._
import sttp.tapir.Endpoint
import sttp.tapir.PublicEndpoint
import sttp.tapir.json.circe._
import zio._

import products.domain.repository.ProductRepository
import products.domain.entity.Product

import products.application.get_product._
import products.application.get_products._
import products.application.create_product._
import products.application.update_product._
import products.application.remove_product._

import shared.responses._
import shared.BaseController
import shared.mapper.endpoints.Exposer._
import authentications.domain.service.JwtService
import authentications.domain.error.AuthenticationError
import authentications.domain.entity._

class ProductController()(using productRepository:ProductRepository, jwtService: JwtService) extends BaseController():

  private val getProduct: PublicEndpoint[Long, ErrorResponse , ResponseGetProduct, Any] = 
    endpoint
    .in("products" / path[Long]("id"))
    .get
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseGetProduct])
    .expose

  private val getProductRoute: ZServerEndpoint[Any, Any] = getProduct.zServerLogic { (id:Long) =>
    GetProductUseCase()
      .execute(RequestGetProduct(id))
      .mapError(e => ErrorResponse(message="Can't get product"))
  }.expose

  private val createProduct:PublicEndpoint[RequestCreateProduct, ErrorResponse,ResponseCreateProduct, Any] =
    endpoint
    .in("products")
    .in(jsonBody[RequestCreateProduct])
    .post
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseCreateProduct])
    .expose


  private val createProductRoute: ZServerEndpoint[Any, Any] = createProduct.zServerLogic{ request => 
    CreateProductUseCase()
      .execute(request)
      .mapError(e => ErrorResponse(message="Can't create product"))
  }.expose


  private val getProducts: PublicEndpoint[(Int, Int), ErrorResponse, PaginatedResponse[Product], Any] =
    endpoint
      .in("products")
      .get
      .in(
        query[Int]("page").and(query[Int]("per_page"))
      )
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[PaginatedResponse[Product]]).expose


  private val getProductsRoute: ZServerEndpoint[Any, Any] = getProducts.zServerLogic{ (page:Int, perPage: Int) => 
    GetProductsUseCase()
      .execute(RequestGetProducts(page, perPage))
      .mapError(e => ErrorResponse(message="Can't get product"))
  }.expose


  private val updateProduct: PublicEndpoint[(Long, RequestUpdateProduct), ErrorResponse , ResponseUpdateProduct, Any] = 
    endpoint
    .in("products" / path[Long]("id"))
    .in(jsonBody[RequestUpdateProduct])
    .put
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseUpdateProduct])
    .expose

  private val updateProductRoute: ZServerEndpoint[Any, Any] = updateProduct.zServerLogic{ (id:Long, request: RequestUpdateProduct) => 
    UpdateProductUseCase(id)
      .execute(request) 
      .mapError(e => ErrorResponse(message="Can't update product"))
  }.expose

  private val removeProduct: PublicEndpoint[Long, ErrorResponse , ResponseRemoveProduct, Any] = 
    endpoint
    .in("products" / path[Long]("id"))
    .delete
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseRemoveProduct])
    .expose
  
  private val removeProductRoute: ZServerEndpoint[Any, Any] = removeProduct.zServerLogic{ (id:Long) => 
    RemoveProductUseCase()
      .execute(RequestRemoveProduct(id)) 
      .mapError(e => ErrorResponse(message="Can't remove product"))
  }.expose
