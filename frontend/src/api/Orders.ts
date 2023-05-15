import {BackResponse} from "@/models/BackResponse";
import Sale from "@/models/Sale";
import {OrderData} from "@/models/Order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllOrders(token: string, page: number = 0, per_page: number = 10): Promise<BackResponse> {
  const response = await fetch(API_URL + `orders?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;
}

export async function getOrderByid(token: string, id: number): Promise<OrderData> {
  const response = await fetch(API_URL + `orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as OrderData;
}