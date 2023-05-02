package reports.domain.repository

import reports.domain.entity.SoldProductInformation
import java.time.LocalDate

trait ReportRepository:
    def getMostSoldProducts(startDate:LocalDate, endDate:LocalDate, amountOfProducts:Int): List[SoldProductInformation]
