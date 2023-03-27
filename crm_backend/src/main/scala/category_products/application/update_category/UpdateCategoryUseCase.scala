package category_products.application.update_category

import shared.application.BaseUseCase
import category_products.domain.repository.CategoryProductRepository
import category_products.domain.entity.CategoryProduct
import zio.ZIO

class UpdateCategoryUseCase(categoryId: Long)
(using categoryProductRepository: CategoryProductRepository) 
extends BaseUseCase[RequestUpdateCategory, ResponseUpdateCategory]:

  override def execute(request: RequestUpdateCategory) = 
    val updated = categoryProductRepository.updateCategory(
      CategoryProduct(
        id = categoryId,
        name = request._1,
        description = request._2
      )
    )
    ZIO.succeed( ResponseUpdateCategory( updated ) )
