'use client'
import { onGoogleAppSignin } from '@/lib/auth'
import { Button } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
  const router = useRouter()

  const handleGoogleSignin = async () => {
    const { data, message, isSuccess, isError } = await onGoogleAppSignin()

    if (isError) {
      console.log(message)
    }
    if (isSuccess) {
      router.push('/admin')
    }
  }
  return (
    <Button onClick={handleGoogleSignin} type="button">
      Sign in with Google
    </Button>
  )
}

export default AuthPage
