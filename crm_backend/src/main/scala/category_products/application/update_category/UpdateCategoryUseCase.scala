package category_products.application.update_category

import shared.application.BaseUseCase
import category_products.domain.repository.CategoryProductRepository
import category_products.domain.entity.CategoryProduct

class UpdateCategoryUseCase(val categoryId: Long)(using categoryProductRepository: CategoryProductRepository) extends BaseUseCase[RequestUpdateCategory, ResponseUpdateCategory]:

  override def execute(request: RequestUpdateCategory): Option[ResponseUpdateCategory] = 
    categoryProductRepository.updateCategory(
      CategoryProduct(
        id = categoryId,
        name = request._1,
        description = request._2
      )
    )
    Some(ResponseUpdateCategory(
      completed = true
    ))
