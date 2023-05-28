import React from "react";

type OrderContextType = {
  productsAdded: any[],
  setProductsAdded: (products: any[]) => void,
}

const orderContexState = {
  productsAdded: [],
  setProductsAdded: (products: any[]) => {  }
}

const OrderContext = React.createContext<OrderContextType>(orderContexState)

export default OrderContext