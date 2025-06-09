import { appClient } from 'payload-auth-plugin/client'
import { getCurrentUser } from 'payload-auth-plugin/client/hooks'

const { signin, signup, refresh } = appClient({ name: 'app' })

interface SigninValues {
  email: string
  password: string
}

interface SignupValues {
  email: string
  password: string
  profile?: Record<string, any>
}

export const logoutUser = async () => {
  const res = await fetch('http://localhost:3000/api/app-users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getUser = async () => {
  const res = await getCurrentUser({ name: 'app' }, { fields: ['email'] })
  return res
}
export const onGoogleAppSignin = async () => {
  const { data, message, isSuccess, isError } = await signin().oauth('google')

  return {
    data,
    message,
    isSuccess,
    isError,
  }
}

export const handleRefresh = async () => {
  const res = await refresh()
  return res
}

export const handleAppUserSignup = async (values: SignupValues) => {
  console.log('received values:', values)
  const { password } = signup()
  const response = await password(values)
  console.log({ response })
  return response
}

export const handleAppUserSignin = async (values: SigninValues) => {
  const { password } = signin()
  const response = await password(values)
  return response
}
