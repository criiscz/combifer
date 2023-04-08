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

object TestSuite extends BaseSuite {
  val taxName = "Iva"
  var lastCreatedTax:Long = -1

  override def spec = suite("Taxes Suite")(
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
    test("Create Tax"){
      for
        createdTax <- CreateTaxUseCase().execute(
          RequestCreateTax(
            name = taxName,
            description = Some("Nuevo iva al hierro"),
            value = 10.10
          )
        )
        _ <- ZIO.succeed{lastCreatedTax = createdTax.data.id}
      yield assertTrue(createdTax.data.name.equals(taxName))
    }

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
