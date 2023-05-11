export default interface Sale {
  id: number;
  creationDate: string;
  description: string;
  clientId: number;
  employeeId: number;
}

export interface SaleComplete {
  client:{
    documentType: string
    email: string
    idDocument: number
    lastName: string
    name: string
    personType: string
    phone: string
  },
  employee: {
    documentType: string
    email: string
    idDocument: number
    lastName: string
    name: string
    personType: string
    phone: string
  },
  products: {
    id: number
    productDescription: string
    productDiscount: number
    productLotId: number
    productMeasureUnit: string
    productName: string
    productQuantity: number
    productUnitPrice: number
    saleId: number
    taxId: number
  }[],
  sale: {
    clientId: number
    creationDate: string
    description: string
    employeeId: number
    id: number
  }
}