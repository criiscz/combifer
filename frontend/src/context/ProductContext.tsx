import React from "react";
import {ProductComplete} from "@/models/Product";

type ProductContextType = {
  product: ProductComplete | undefined,
  setProduct?: React.Dispatch<React.SetStateAction<ProductComplete | undefined>>
}

const productContexState = {
  product: undefined,
  setProduct: () => {}
}

const ProductContext = React.createContext<ProductContextType>(productContexState)

export default ProductContext