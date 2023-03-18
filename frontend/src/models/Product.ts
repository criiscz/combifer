import {MeasureUnit} from "@/models/MeasureUnit";

export interface Product {
  id: number;
  name?: string;
  description?: string;
  measure_unit?: MeasureUnit;
  location_id?: number;
  category_id?: number;
}