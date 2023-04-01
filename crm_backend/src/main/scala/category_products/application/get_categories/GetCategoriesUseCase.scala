package category_products.application.get_categories

import shared.application.BaseUseCase
import category_products.domain.repository.CategoryProductRepository
import zio.ZIO

class GetCategoriesUseCase()
(using categoryProductRepository: CategoryProductRepository) 
extends BaseUseCase[RequestGetCategories, ResponseGetCategories]:

  override def execute(request: RequestGetCategories) = 
    ZIO.succeed(
      for
        categories <- ZIO.succeed(categoryProductRepository.getCategories(request.from, request.to))
        total <- ZIO.succeed(categoryProductRepository.getTotalAmountOfCategories())
      yield( ResponseGetCategories(data = categories,request=request, total = total) )
    ).flatten

