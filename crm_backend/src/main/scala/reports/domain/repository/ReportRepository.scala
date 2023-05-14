package reports.domain.repository

import reports.domain.entity.SoldProductInformation
import java.time.LocalDate
import order_products.domain.entity.OrderProduct

trait ReportRepository:
    def getMostSoldProducts(startDate:LocalDate, endDate:LocalDate, amountOfProducts:Int): List[SoldProductInformation]
    def getOrderProducts(startDate:LocalDate, endDate:LocalDate): List[OrderProduct]
