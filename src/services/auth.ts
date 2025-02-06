

"use server"

import { cookies } from "next/headers"

const VALID_USERNAME = process.env.NEXT_PUBLIC_VALID_USERNAME
const VALID_PASSWORD = process.env.NEXT_PUBLIC_VALID_PASSWORD

export async function signIn(username: string, password: string) {
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return { success: false, message: "Invalid credentials" }
  }

  // Set a secure, HTTP-only cookie
  cookies().set({
    name: "isAuthenticated",
    value: "true",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "strict",
  })

  return { success: true }
}

export async function logout() {
  // Remove the authentication cookie
  cookies().delete("isAuthenticated")
  return { success: true }
}
