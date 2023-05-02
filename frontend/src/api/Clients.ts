import {BackResponse} from "@/models/BackResponse";
import {Client} from "@/models/Client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllClients(token: string, page: number = 0, per_page: number = 10): Promise<BackResponse> {
  const response = await fetch(API_URL + `clients?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;
}

export async function getClient(token: string, clientId: number | string): Promise<BackResponse> {
  const response = await fetch(API_URL + `clients/${clientId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;
}

export async function createClient(token: string, client: ClientCreate): Promise<Client> {
  console.log(JSON.stringify(client));
  const response = await fetch(API_URL + `clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(client),
  });
  return await response.json() as Client;
}

interface ClientCreate {
  lastName: string;
  documentType: string;
  phone: string;
  document: number;
  name: string;
  personType: string;
  email: string
}