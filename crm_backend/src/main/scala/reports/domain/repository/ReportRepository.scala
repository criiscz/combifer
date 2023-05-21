package reports.domain.repository

import reports.domain.entity.SoldProductInformation
import java.time.LocalDate
import order_products.domain.entity.OrderProduct
import sale_products.domain.entity.SaleProduct

trait ReportRepository:
    def getMostSoldProducts(startDate:LocalDate, endDate:LocalDate, amountOfProducts:Int): List[SoldProductInformation]
    def getOrderProducts(startDate:LocalDate, endDate:LocalDate): List[OrderProduct]
    def getSaleProducts(startDate:LocalDate, endDate:LocalDate): List[SaleProduct]
    def getTotalOutcomeBetween(startDate:LocalDate, endDate:LocalDate): Option[Double]
    def getTotalIncomeBetween(startDate:LocalDate, endDate:LocalDate): Option[Double]
