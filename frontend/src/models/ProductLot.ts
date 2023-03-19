import {Product} from "@/models/Product";

export interface ProductLot {
  id: number;
  productId?: number;
  price?: number;
  enter_date?: string;
  emptyness_date?: string;
  quantity?: number;
}

export interface ProductLotComplete {
  id: number;
  product: Product;
  price?: number;
  enter_date?: string;
  emptyness_date?: string;
  quantity?: number;

}