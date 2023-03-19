import {Product, ProductComplete} from "@/models/Product";
import {BackResponse} from "@/models/BackResponse";


// get API_URL from .env file
// const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';
// const API_URL = 'http://localhost:8090/';
const API_URL = 'http://3.237.202.227/';

export const getAllProducts = async (authToken:string, page: number = 0, per_page:number = 10): Promise<BackResponse> => {
  const response = await fetch(API_URL + `products?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as BackResponse;
}


export async function createProduct(product: Product): Promise<boolean> {
  const body = JSON.stringify(product);
  const request = await fetch(API_URL + "products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body
  });
  const response = await request.json() as Product;
  return product === response;
}

export async function deleteProduct(authToken: string = "", productId: number | undefined): Promise<boolean> {
  const request = await fetch(API_URL + `/products/${productId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    },
  });
  return request.type.toString() !== "";
}

export async function updateProduct(authToken: string = "", product: Product, idProduct:string | number): Promise<boolean> {
  const body = JSON.stringify(product);
  const request = await fetch(API_URL + `products/${idProduct}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Product;
  return product === response;
}

export async function getProduct(productId: number | undefined): Promise<BackResponse> {
  const response = await fetch(API_URL + `products-lots/${productId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json() as BackResponse;
}