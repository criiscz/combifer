package category_products.application.create_category

import shared.application.BaseUseCase
import category_products.domain.entity.CategoryProduct
import category_products.domain.repository.CategoryProductRepository

class CreateCategoryUseCase()(using categoryProductRepository: CategoryProductRepository) extends BaseUseCase[RequestCreateCategory, ResponseCreateCategory]:

  override def execute(request: RequestCreateCategory): Option[ResponseCreateCategory] =
    val category = categoryProductRepository.insertCategory(
      CategoryProduct(
        name = request.name,
        description = request.description
      )
    )
    Some(
      ResponseCreateCategory(data = category)
    )

