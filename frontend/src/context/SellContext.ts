import React from "react";
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import {Client} from "@/models/Client";

type SellContextType = {
  products: ProductCompleteQ[] | undefined,
  setProducts: React.Dispatch<React.SetStateAction<ProductCompleteQ[] | ProductComplete[]>>
  productsSelected: ProductCompleteQ[] | undefined,
  setProductsSelected: React.Dispatch<React.SetStateAction<ProductCompleteQ[] | ProductComplete[] | undefined>>
  selectedClient: Client | undefined,
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | undefined>>
  productTotal: number,
  setProductTotal: React.Dispatch<React.SetStateAction<number>>
  iva: number,
  setIva: React.Dispatch<React.SetStateAction<number>>
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  discount: number,
  setDiscount: React.Dispatch<React.SetStateAction<number>>
  taxId: number,
  setTaxId: React.Dispatch<React.SetStateAction<number>>
}

const sellContextState = {
  products: undefined,
  setProducts: () => {},
  productsSelected: undefined,
  setProductsSelected: () => {},
  selectedClient: undefined,
  setSelectedClient: () => {},
  productTotal: 0,
  setProductTotal: () => {},
  iva: 0,
  setIva: () => {},
  total: 0,
  setTotal: () => {},
  discount: 0,
  setDiscount: () => {},
  taxId: 0,
  setTaxId: () => {}
}

const SellContext = React.createContext<SellContextType>(sellContextState)

export default SellContext