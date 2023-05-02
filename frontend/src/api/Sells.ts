import {BackResponse} from "@/models/BackResponse";
import {Client} from "@/models/Client";
import Sale from "@/models/Sale";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllSells(token: string, page: number = 0, per_page: number = 100): Promise<BackResponse> {
  const response = await fetch(API_URL + `sales?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;

}

export async function getSellById(token: string, id: number): Promise<Sale> {
  const response = await fetch(API_URL + `sales/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as Sale;
}

export async function createNewSell(token: string, sell: SellCreate): Promise<Sale> {
  console.log(JSON.stringify(sell));
  const response = await fetch(API_URL + `sales/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(sell),
  });
  return await response.json() as Sale;
}

export interface SellCreate {
  description: string;
  clientId: number;
  products: {
    lotId: number | undefined;
    quantity: number | undefined;
    discount: number | undefined;
    taxId: number | undefined;
  }[];
}