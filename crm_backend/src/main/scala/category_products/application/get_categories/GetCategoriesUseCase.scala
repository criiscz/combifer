package category_products.application.get_categories

import shared.application.BaseUseCase
import category_products.domain.repository.CategoryProductRepository

class GetCategoriesUseCase()(using categoryProductRepository: CategoryProductRepository) extends BaseUseCase[RequestGetCategories, ResponseGetCategories]:

  override def execute(request: RequestGetCategories): Option[ResponseGetCategories] = 
    Some(
      ResponseGetCategories(
        data = categoryProductRepository.getCategories(request.page, request.perPage),
        request = request,
        total = categoryProductRepository.getTotalAmountOfCategories(),
      )
    )

