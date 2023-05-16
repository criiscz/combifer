export interface Order {
  id: number;
  createDate: string;
  receiveDate: string;
  description: string;
  employeeId: number;
}
export interface OrderData {
  order: {
    id: number;
    createDate: string;
    receiveDate: string;
    description: string;
    employeeId: number;
  };
  employee: {
    idDocument: number;
    documentType: string;
    personType: string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
  };
  products: {
      id: number;
      productQuantity: number;
      productUnitPrice: number;
      productName: string;
      orderId: number;
      productLotId: number;
    }[];
}

