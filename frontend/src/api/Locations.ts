import {BackResponse} from "@/models/BackResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllLocations(page: number = 0, per_page: number = 10): Promise<BackResponse> {
  const response = await fetch(API_URL + `locations?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json() as BackResponse;
}