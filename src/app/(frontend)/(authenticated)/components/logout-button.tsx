'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { LogOut } from 'lucide-react'

import { appClient } from 'payload-auth-plugin/client'
import { logout } from '../actions/logout'

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {} = appClient({ name: 'app' })

  async function handleLogout() {
    setIsPending(true)
    setError(null)

    try {
      const res = await logout()
      if (res.success) {
        // Redirect to home page after successful logout
        router.push('/')
      } else {
        // Display error message
        setError(res.error || 'Logout failed')
      }
    } catch (error) {
      setError('Logout failed')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogout} disabled={isPending} className="text-white rounded">
        {isPending ? 'Logging out...' : <LogOut size={24} />}
      </button>
    </>
  )
}
