import {ProductLot} from "@/models/ProductLot";
import {BackResponse} from "@/models/BackResponse";

// get API_URL from .env.local file
// const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';
// const API_URL = 'http://localhost:8090/';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getAllProductLots(productId: number | string, page: number = 0, per_page: number = 100): Promise<BackResponse> {
  const response = await fetch(API_URL + `product-lots?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json() as BackResponse;
}

export async function createProductLot(productLot: ProductLot): Promise<ProductLot> {
  const response = await fetch(API_URL + `product-lots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productLot),
  });
  return await response.json() as ProductLot;
}

export async function deleteProductLot(productLotId: number | undefined): Promise<BackResponse> {
  const request = await fetch(API_URL + `product-lots/${productLotId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "none",
    },
  });
  return await request.json() as BackResponse;
}

export async function updateProductLot(productLot: ProductLot, idProductLot: number | undefined): Promise<BackResponse> {
  const body = JSON.stringify(productLot);
  const request = await fetch(API_URL + `product-lots/${idProductLot}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body
  });
  return await request.json() as BackResponse;
}