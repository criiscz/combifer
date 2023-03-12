import { Product } from "@/models/Product";
import axios from "axios";


// get API_URL from .env file
const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';

export const getAllProducts = async (authToken:string): Promise<Product[]> => {
  const response = await fetch(API_URL + "/products/", {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as Product[];
}


export async function createProduct(authToken: string = "", product: Product): Promise<boolean> {
  const body = JSON.stringify(product);
  const request = await fetch(API_URL + "/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
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
  const request = await fetch(API_URL + `/products/${idProduct}/`, {
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

export async function getProduct(authToken: string = "", productId: number | string): Promise<Product> {
  const response = await fetch(API_URL + `/products/${productId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as Product;
}