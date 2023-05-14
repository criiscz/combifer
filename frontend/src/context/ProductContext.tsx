import React from "react";
import {ProductComplete, ProductCompleteQ} from "@/models/Product";

type ProductContextType = {
  product: ProductComplete | ProductCompleteQ |undefined,
  setProduct?: React.Dispatch<React.SetStateAction<ProductComplete | undefined>>
  refresh: boolean,
  setRefresh: (state:boolean) => void,
  products: ProductComplete[] | ProductCompleteQ[] | undefined,
  setProducts: React.Dispatch<React.SetStateAction<ProductComplete[]| ProductCompleteQ[] | undefined>>,
  productsSelected: ProductComplete[] | ProductCompleteQ[],
  setProductsSelected: React.Dispatch<React.SetStateAction<ProductComplete[]| ProductCompleteQ[]>>
}

const productContexState = {
  product: undefined,
  setProduct: () => {},
  refresh: false,
  setRefresh: (state:boolean) => {},
  products: undefined,
  setProducts: () => {},
  productsSelected: [],
  setProductsSelected: () => {}
}

const ProductContext = React.createContext<ProductContextType>(productContexState)

export default ProductContext