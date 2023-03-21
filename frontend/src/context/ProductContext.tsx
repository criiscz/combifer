import React from "react";
import {ProductComplete} from "@/models/Product";

type ProductContextType = {
  product: ProductComplete | undefined,
  setProduct?: React.Dispatch<React.SetStateAction<ProductComplete | undefined>>
  refresh: boolean,
  setRefresh: (state:boolean) => void
}

const productContexState = {
  product: undefined,
  setProduct: () => {},
  refresh: false,
  setRefresh: (state:boolean) => {}

}

const ProductContext = React.createContext<ProductContextType>(productContexState)

export default ProductContext