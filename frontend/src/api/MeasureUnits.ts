import {ProductLot} from "@/models/ProductLot";
import {BackResponse} from "@/models/BackResponse";
import {MeasureUnit} from "@/models/MeasureUnit";

// get API_URL from .env.local file
// const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';
// const API_URL = 'http://localhost:8090/';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


// export async function getAllMeasureUnits(page: number = 0, per_page: number = 10): Promise<BackResponse> {
//   const response = await fetch(API_URL + `measureUnits?page=${page}&per_page=${per_page}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return await response.json() as BackResponse;
// }

export function getAllMeasureUnits(): Promise<BackResponse> {
  return new Promise((resolve, reject) => {
    resolve({
      data: [
        MeasureUnit.METERS,
        MeasureUnit.KILOGRAMS,
        MeasureUnit.POUNDS,
        MeasureUnit.UNITS,
        MeasureUnit.LITERS,
      ],
      meta: {
        currentPage: 0,
        lastPage: 0,
        from: 0,
        to: 0,
        total: 5,
      }
    });
  });
}
