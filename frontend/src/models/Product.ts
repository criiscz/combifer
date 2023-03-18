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
  id: number;
  name?: string;
  description?: string;
  measure_unit?: MeasureUnit;
  location: Location;
  category: Category;
}