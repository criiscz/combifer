package category_products.application.create_category

import shared.application.BaseUseCase
import category_products.domain.entity.CategoryProduct
import category_products.domain.repository.CategoryProductRepository
import zio.ZIO

class CreateCategoryUseCase()
(using categoryProductRepository: CategoryProductRepository) 
extends BaseUseCase[RequestCreateCategory, ResponseCreateCategory]:

  override def execute(request: RequestCreateCategory) =
    val category = categoryProductRepository.insertCategory(
      CategoryProduct(
        name = request.name,
        description = request.description
      )
    )
    ZIO.succeed(ResponseCreateCategory(data = category))
