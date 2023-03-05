package category_products.infrastructure.controller


import io.circe.generic.auto._
import sttp.tapir.generic.auto._
import sttp.tapir.PublicEndpoint
import sttp.tapir.server.ziohttp.ZioHttpInterpreter
import sttp.tapir.swagger.bundle.SwaggerInterpreter
import sttp.tapir.ztapir._
import sttp.tapir.json.circe._
import shared.BaseController
import zio._

import category_products.domain.entity.CategoryProduct
import category_products.domain.repository.CategoryProductRepository
import category_products.application.get_categories._
import category_products.application.get_category._
import category_products.application.create_category._
import category_products.application.update_category._

import shared.responses.PaginatedResponse

class CategoryProductController() (using categoryProductRepository: CategoryProductRepository) extends BaseController:

  override def endpoints() = List(getAllCategoryProductRoute, createCategoryRoute, updateCategoryRoute, getCategoryRoute)
  override def routes() = List(getAllCategoryProduct, createCategory, updateCategory, getCategory)

  private val getCategory: PublicEndpoint[Long, String , ResponseGetCategory, Any] = 
    endpoint
    .in("category-products" / path[Long]("id"))
    .get
    .errorOut(stringBody)
    .out(jsonBody[ResponseGetCategory])

  private val getCategoryRoute: ZServerEndpoint[Any, Any] = getCategory.zServerLogic { (id:Long) =>
    GetCategoryUseCase().execute(id) match{
      case Some(value) => ZIO.succeed(value)
      case None => ZIO.fail("Category not found!")
    }
  }

  private val getAllCategoryProduct: PublicEndpoint[(Int, Int), String, PaginatedResponse[CategoryProduct], Any] =
    endpoint
      .in("category-products")
      .get
      .in(
        query[Int]("page").and(query[Int]("per_page"))
      )
      .errorOut(stringBody)
      .out(jsonBody[PaginatedResponse[CategoryProduct]])

  private val getAllCategoryProductRoute: ZServerEndpoint[Any, Any] = getAllCategoryProduct.zServerLogic { params =>
    val response = GetCategoriesUseCase().execute(
      RequestGetCategories.create(
        params._1,
        params._2)
      )
    ZIO.succeed(response.get)
  }

  private val createCategory: PublicEndpoint[RequestCreateCategory, String, ResponseCreateCategory, Any] = 
    endpoint
      .in("category-products")
      .post
      .in(jsonBody[RequestCreateCategory])
      .errorOut(stringBody)
      .out(jsonBody[ResponseCreateCategory])

  private val createCategoryRoute: ZServerEndpoint[Any, Any] = createCategory.zServerLogic { request =>
    val response = CreateCategoryUseCase().execute(request)
    ZIO.succeed(response.get)
  }

  private val updateCategory: PublicEndpoint[(Long, RequestUpdateCategory), String , ResponseUpdateCategory, Any] = 
    endpoint
    .in("category-products" / path[Long]("id"))
    .put
    .in(jsonBody[RequestUpdateCategory])
    .errorOut(stringBody)
    .out(jsonBody[ResponseUpdateCategory])

  private val updateCategoryRoute: ZServerEndpoint[Any, Any] = updateCategory.zServerLogic { (id:Long, request:RequestUpdateCategory) =>
    val response = UpdateCategoryUseCase(id).execute(request)
    ZIO.succeed(response.get)
  }
