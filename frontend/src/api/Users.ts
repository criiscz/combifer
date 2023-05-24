import {BackResponse} from "@/models/BackResponse";
import {useToken} from "@/hooks/useToken";
import {getToken} from "@/helpers/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllUsers(token: string, page: number = 0, per_page: number = 100): Promise<BackResponse> {
  const response = await fetch(API_URL + `users?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;
}

export async function changeUserRole(roleId: number, userId: number, token?: string): Promise<BackResponse> {
  if (!token) token = getToken()
  const response = await fetch(API_URL + `roles/${roleId}/set-to/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  return await response.json() as BackResponse;
}
