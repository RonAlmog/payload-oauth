'use server'

import { AppUser } from '@/payload-types'
import config from '@payload-config'
import { cookies } from 'next/headers'

import { getPayload } from 'payload'

// we cannot import the type from payload/dist.../login so we define it here
export type Result = {
  exp?: number
  token?: string
  user?: AppUser
}

export interface SignupResponse {
  success: boolean
  error?: string
}

interface SignupParams {
  email: string
  password: string
}

export async function signupUser({ email, password }: SignupParams): Promise<SignupResponse> {
  const payload = await getPayload({ config })
  try {
    await payload.create({
      collection: 'app-users',
      data: {
        email,
        password,
      },
    })

    const result: Result = await payload.login({
      collection: 'app-users',
      data: {
        email,
        password,
      },
    })

    if (result.token) {
      let cookieStore = await cookies()
      cookieStore.set({
        name: 'payload-token',
        value: result.token,
        httpOnly: true,
        path: '/',
      })

      return { success: true }
    } else {
      console.log('Login failed: No token received')
      return { success: false, error: 'An error occurred' }
    }
  } catch (error) {
    console.log(error)
    return { success: false, error: 'An error occurred' }
  }
}
