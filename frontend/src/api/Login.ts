import {User} from "@/models/User";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(username?: string, password?: string) {
  return fetch(API_URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        usernameOrEmail: username,
        password
      }
    )
  })
}

export async function register(userData: User) {
  return fetch(API_URL + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

export async function sessionInfo(token: string) {
  const response =  await fetch(API_URL + 'session-info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
  return await response.json()
}