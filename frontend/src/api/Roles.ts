import {BackResponse} from "@/models/BackResponse";
import {getToken} from "@/helpers/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllRoles(token?: string, page: number = 0, per_page: number = 20): Promise<BackResponse> {
  if (!token) token = getToken()
  const response = await fetch(API_URL + `roles?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;
}
