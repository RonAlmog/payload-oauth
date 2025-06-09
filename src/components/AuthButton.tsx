'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { adminClient } from 'payload-auth-plugin/client'

export const AuthButton = () => {
  const router = useRouter()
  const { signin } = adminClient()

  const handleGoogleSignin = async () => {
    const { data, message, isError, isSuccess } = await signin().oauth('google')
    if (isError) {
      console.error(message)
      return
    }
    if (isSuccess) {
      console.log('Google Sign In Success:', data)
      router.push('/admin')
    }
    console.log('Google Sign In Data:', data)
  }
  return (
    <Button
      onClick={handleGoogleSignin}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Sign In
    </Button>
  )
}
