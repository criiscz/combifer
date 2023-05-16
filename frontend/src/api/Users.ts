import {BackResponse} from "@/models/BackResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllUsers(token: string, page: number = 0, per_page: number = 10): Promise<BackResponse> {
  const response = await fetch(API_URL + `users?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;
}