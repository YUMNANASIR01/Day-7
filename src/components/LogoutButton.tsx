"use client"

import { useRouter } from "next/navigation"
import { logout } from "@/services/auth"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      router.push("/login")
    }
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  )
}

