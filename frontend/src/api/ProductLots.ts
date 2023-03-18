import { ProductLot } from "@/models/ProductLot";

// get API_URL from .env file
const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';


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