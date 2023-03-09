package category_products.application.get_category

import shared.application.BaseUseCase
import category_products.domain.repository.CategoryProductRepository
import category_products.domain.entity.CategoryProduct

class GetCategoryUseCase () (using categoryProductRepository: CategoryProductRepository) extends BaseUseCase[Long, ResponseGetCategory]:

  override def execute(request: Long): Option[ResponseGetCategory] =
    categoryProductRepository.getCategory(request) match {
      case Some(category) => Some(ResponseGetCategory(data = category))
      case None => None
    }

