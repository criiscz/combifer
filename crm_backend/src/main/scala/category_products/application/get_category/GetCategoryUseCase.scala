package category_products.application.get_category

import shared.application.BaseUseCase
import category_products.domain.repository.CategoryProductRepository
import category_products.domain.entity.CategoryProduct
import zio.ZIO

class GetCategoryUseCase () 
(using categoryProductRepository: CategoryProductRepository) 
extends BaseUseCase[Long, ResponseGetCategory]:

  override def execute(request: Long) =
    categoryProductRepository.getCategory(request) match {
      case Some(category) => ZIO.succeed(ResponseGetCategory(data = category))
      case None => ZIO.fail(new Throwable())
    }

