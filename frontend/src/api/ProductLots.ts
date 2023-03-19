import { ProductLot } from "@/models/ProductLot";

// get API_URL from .env file
// const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';
// const API_URL = 'http://localhost:8090/';
const API_URL = 'http://3.237.202.227:8090/';

export async function getProductLot(authToken: string = "", productId: number | string): Promise<ProductLot[]> {
  const response = await fetch(API_URL + `products/${productId}/product-lots`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as ProductLot[];
}

export async function getAllProductLots(productId: number | string, page : number = 0, per_page: number = 10): Promise<ProductLot[]> {
  const response = await fetch(API_URL + `products-lots?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.json())
  return await response.json() as ProductLot[];
}