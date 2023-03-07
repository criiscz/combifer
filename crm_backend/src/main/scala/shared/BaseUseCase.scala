package shared.application

/**
 * The base use case class for all the use cases in the app.
 * It have two generic parameters.
 * TRequest -> The Request's type 
 * TResponse -> The Response  's type
 */
abstract class BaseUseCase[TRequest, TResponse]:
  
  def execute(request: TRequest):Option[TResponse]
