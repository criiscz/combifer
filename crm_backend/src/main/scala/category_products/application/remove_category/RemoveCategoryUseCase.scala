package category_products.application.remove_category

import shared.application.BaseUseCase
import products.domain.repository.ProductRepository
import category_products.domain.repository.CategoryProductRepository

class RemoveCategoryUseCase () 
(using categoryProductRepository: CategoryProductRepository, productRepository:ProductRepository) 
extends BaseUseCase[RequestRemoveCategory, ResponseRemoveCategory]:

  override def execute(request: RequestRemoveCategory): Option[ResponseRemoveCategory] =
    val amountOfProductsInCategory = productRepository.getProductsWithCategory(request.id).size
    if(amountOfProductsInCategory > 0) 
      Some(ResponseRemoveCategory("Can't remove, there are products with this category"))
    categoryProductRepository.removeCategory(request.id)
    Some(ResponseRemoveCategory("Completed!"))
