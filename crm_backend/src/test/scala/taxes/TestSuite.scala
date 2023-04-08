package taxes

import category_products.application.create_category.*
import category_products.application.get_category.*
import shared.BaseSuite
import taxes.application.create_tax.{CreateTaxUseCase, RequestCreateTax}
import taxes.application.get_taxes.{GetTaxesUseCase, RequestGetTaxes}
import taxes.application.remove_tax.{RemoveTaxUseCase, RequestRemoveTax}
import zio.*
import zio.test.*
import zio.test.Assertion.*
import scala.util.Random

object TestSuite extends BaseSuite {
  val taxName = "Iva"
  var lastCreatedTax:Long = -1

  override def spec = suite("Taxes Suite")(
    test("Create Tax"){
      for
        createdTax <- CreateTaxUseCase().execute(
          RequestCreateTax(
            name = taxName,
            description = Some("Nuevo iva al hierro"),
            value = Random().nextFloat()
          )
        )
        _ <- ZIO.succeed{lastCreatedTax = createdTax.data.id}
      yield assertTrue(createdTax.data.name.equals(taxName))
    } @@ TestAspect.repeat(Schedule.recurs(5)),

    test("Get taxes"){
      for
        taxes <- GetTaxesUseCase().execute(
          RequestGetTaxes(
            page = 0,
            perPage = 10
          )
        )
      yield assertTrue(taxes.data.length > 0)
    },

    test("Remove Tax") {
      for
        removedTax <- RemoveTaxUseCase().execute(
          RequestRemoveTax(
            id = lastCreatedTax
          )
        )
      yield assertTrue(removedTax.data.name.equals(taxName))
    }
  )@@ TestAspect.sequential @@ TestAspect.timed
}
