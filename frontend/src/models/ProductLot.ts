import {Product} from "@/models/Product";

export interface ProductLot {
  id: number;
  productId?: number;
  price?: number;
  enterDate?: string;
  emptynessDate?: string;
  quantity?: number;
}