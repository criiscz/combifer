package category_products.infrastructure.controller

import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.PublicEndpoint
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import zio._

import category_products.domain.entity.CategoryProduct
import category_products.domain.repository.CategoryProductRepository
import category_products.application.get_categories._
import category_products.application.get_category._
import category_products.application.create_category._
import category_products.application.update_category._
import category_products.application.remove_category._

import shared.responses.PaginatedResponse
import shared.mapper.endpoints.Exposer._
import products.domain.repository.ProductRepository
import shared.responses.ErrorResponse

class CategoryProductController() 
(using categoryProductRepository: CategoryProductRepository, productRepository:ProductRepository):

  private val getCategory: PublicEndpoint[Long, ErrorResponse , ResponseGetCategory, Any] = 
    endpoint
    .in("category-products" / path[Long]("id"))
    .get
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseGetCategory])
    .expose

  private val getCategoryRoute: ZServerEndpoint[Any, Any] = getCategory.zServerLogic { (id:Long) =>
    GetCategoryUseCase()
      .execute(id) 
      .mapError(e => ErrorResponse(message="Can't get product"))
  }.expose

  private val getAllCategoryProduct: PublicEndpoint[(Int, Int), ErrorResponse, PaginatedResponse[CategoryProduct], Any] =
    endpoint
      .in("category-products")
      .get
      .in(
        query[Int]("page").and(query[Int]("per_page"))
      )
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[PaginatedResponse[CategoryProduct]])
      .expose

  private val getAllCategoryProductRoute: ZServerEndpoint[Any, Any] = getAllCategoryProduct.zServerLogic {(page:Int, perPage:Int) =>
    GetCategoriesUseCase()
      .execute( RequestGetCategories( page, perPage))
      .mapError(e => ErrorResponse(message="Can't get product"))
  }.expose

  private val createCategory: PublicEndpoint[RequestCreateCategory, ErrorResponse, ResponseCreateCategory, Any] = 
    endpoint
      .in("category-products")
      .post
      .in(jsonBody[RequestCreateCategory])
      .errorOut(jsonBody[ErrorResponse])
      .out(jsonBody[ResponseCreateCategory])
      .expose

  private val createCategoryRoute: ZServerEndpoint[Any, Any] = createCategory.zServerLogic { request =>
    CreateCategoryUseCase()
      .execute(request)
      .mapError(e => ErrorResponse(message="Can't get product"))
  }.expose

  private val updateCategory: PublicEndpoint[(Long, RequestUpdateCategory), ErrorResponse , ResponseUpdateCategory, Any] = 
    endpoint
    .in("category-products" / path[Long]("id"))
    .put
    .in(jsonBody[RequestUpdateCategory])
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseUpdateCategory])
    .expose

  private val updateCategoryRoute: ZServerEndpoint[Any, Any] = updateCategory.zServerLogic { (id:Long, request:RequestUpdateCategory) =>
    UpdateCategoryUseCase(id)
      .execute(request)
      .mapError(e => ErrorResponse(message="Can't get product"))
  }.expose

  private val removeCategory: PublicEndpoint[Long, ErrorResponse , ResponseRemoveCategory, Any] = 
    endpoint
    .in("category-products" / path[Long]("id"))
    .delete
    .errorOut(jsonBody[ErrorResponse])
    .out(jsonBody[ResponseRemoveCategory])
    .expose

  private val removeCategoryRoute: ZServerEndpoint[Any, Any] = removeCategory.zServerLogic{ (id:Long) => 
    RemoveCategoryUseCase()
      .execute(RequestRemoveCategory(id))
      .mapError(e => ErrorResponse(message="Can't get product"))
  }.expose
