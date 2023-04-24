import {BackResponse} from "@/models/BackResponse";
import {Tax} from "@/models/Tax";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getIVA(token: string, page: number = 0, per_page: number = 1): Promise<BackResponse> {
  const response = await fetch(API_URL + `taxes?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      "Authorization": `Bearer ${token}`
    },

  });
  return await response.json() as BackResponse;
}

export async function createTax(tax:Tax): Promise<Tax> {
  const response = await fetch(API_URL + `taxes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tax),
  });
  return await response.json() as Tax;
}

export async function deleteTax(taxId: number | undefined): Promise<BackResponse> {
  const request = await fetch(API_URL + `taxes/${taxId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "none",
    },
  });
  return await request.json() as BackResponse;
}

export async function updateTax(tax: Tax, idTax: number | undefined): Promise<BackResponse> {
  const body = JSON.stringify(tax);
  const request = await fetch(API_URL + `taxes/${idTax}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body
  });
  return await request.json() as BackResponse;
}
