import {BackResponse} from "@/models/BackResponse";
import cookie from "universal-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const cookies = new cookie();


// const fillDates = (start_date: string, end_date: string) => {
//   if (start_date === "") {
//     const date = new Date();
//     date.setMonth(date.getMonth() - 1);
//     start_date = date.toISOString().split("T")[0];
//   }
//   if (end_date === "") {
//     const date = new Date();
//     end_date = date.toISOString().split("T")[0];
//   }
//   return {start_date, end_date};
// }

export const getReportProductMostSold = async (start_date: string, end_date: string, products_amount: number | string, authToken?: string): Promise<BackResponse> => {
  const response = await fetch(API_URL + `reports/most-sold-products?start_date=${start_date}&end_date=${end_date}&products_amount=${products_amount}`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + (authToken || cookies.get("userToken"))
    }
  });
  return await response.json() as BackResponse;
}

export const getReportBuys = async (start_date: string, end_date: string, authToken?: string): Promise<BackResponse> => {
  const response = await fetch(API_URL + `reports/order-bought-products?start_date=${start_date}&end_date=${end_date}`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + (authToken || cookies.get("userToken"))
    }
  });
  return await response.json() as BackResponse;
}

export const getReportSales = async (start_date: string, end_date: string, authToken?: string): Promise<BackResponse> => {
  const response = await fetch(API_URL + `reports/sale-sold-products?start_date=${start_date}&end_date=${end_date}`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + (authToken || cookies.get("userToken"))
    }
  });
  return await response.json() as BackResponse;
}