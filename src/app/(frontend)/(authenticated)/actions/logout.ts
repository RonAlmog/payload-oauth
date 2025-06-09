'use server'

import { cookies } from 'next/headers'

interface LogoutResponse {
  success: boolean
  error?: string
}

export async function logout(): Promise<LogoutResponse> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token') // Deletes the HTTP-only cookie

    const res = await fetch('http://localhost:3000/api/app-users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      return { success: true }
    } else {
      const errorData = await res.json()
      return { success: false, error: errorData.message || 'Logout failed' }
    }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: 'An error occurred during logout' }
  }
}
