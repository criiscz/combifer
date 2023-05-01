import {Product, ProductComplete} from "@/models/Product";
import {BackResponse} from "@/models/BackResponse";


// get API_URL from .env.local file
// const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';
// const API_URL = 'http://localhost:8090/';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const getAllProducts = async (authToken:string, page: number = 0, per_page:number = 100): Promise<BackResponse> => {
  const response = await fetch(API_URL + `products?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as BackResponse;
}


export async function createProduct(product: Product): Promise<BackResponse> {
  const body = JSON.stringify(product);
  const request = await fetch(API_URL + "products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body
  });
  return await request.json() as BackResponse;
}

export async function deleteProduct(productId: number | undefined): Promise<BackResponse> {
  const request = await fetch(API_URL + `products/${productId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "none",
    },
  });
  return await request.json() as BackResponse;
}

export async function updateProduct(product: Product, idProduct:string | number): Promise<BackResponse> {
  const body = JSON.stringify(product);
  const request = await fetch(API_URL + `products/${idProduct}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body
  });
  return await request.json() as BackResponse;

}
export async function getProduct(productId: number | undefined): Promise<BackResponse> {

  const response = await fetch(API_URL + `product-lots/${productId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json() as BackResponse;
}