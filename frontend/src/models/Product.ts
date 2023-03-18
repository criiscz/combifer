import {MeasureUnit} from "@/models/MeasureUnit";
import Category from "@/models/Category";

export interface Product {
  id: number;
  name?: string;
  description?: string;
  measure_unit?: MeasureUnit;
  location_id?: number;
  category_id?: number;
}

export interface ProductComplete {
  lot: {
    id?: number;
    price?: number;
    enterDate?: string;
    emptynessDate?: string;
    quantity?: number;
    productId?: number;
  };
  product: {
    id?: number;
    name?: string;
    description?: string;
    measureUnit?: string;
    locationId?: number;
    categoryProductId?: number;
  };
  location: {
    id?: number;
    name?: string;
    description?: string;
    img_url?: string;
  };
  category: {
    id?: number;
    name?: string;
    description?: string;
  };
}