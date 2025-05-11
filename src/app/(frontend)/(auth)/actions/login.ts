'use server'

import { cookies, headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { AppUser } from '@/payload-types'
import { login } from '@payloadcms/next/auth'
import { getPayload } from 'payload'

interface LoginProps {
  email: string
  password: string
}
interface LoginResponse {
  success: boolean
  error?: string
}

export type Result = {
  exp?: number
  token?: string
  user?: AppUser
}
export async function loginUser({ email, password }: LoginProps): Promise<LoginResponse> {
  const payload = await getPayload({ config })
  try {
    const result = await payload.login({
      collection: 'app-users',
      data: {
        email,
        password,
      },
    })

    // console.log({ result })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  } catch (error) {
    console.log('Login error', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
