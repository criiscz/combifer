import {ProductLot} from "@/models/ProductLot";
import {BackResponse} from "@/models/BackResponse";

// get API_URL from .env file
// const API_URL = 'https://618d4d14fe09aa001744068b.mockapi.io/';
// const API_URL = 'http://localhost:8090/';
const API_URL = 'http://3.237.202.227:8090/';


export async function getAllCategories(page: number = 0, per_page: number = 10): Promise<BackResponse> {
  const response = await fetch(API_URL + `category-products?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json() as BackResponse;

}