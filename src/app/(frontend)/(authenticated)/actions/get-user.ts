'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Payload } from 'payload'
import { AppUser } from '@/payload-types'
import { getCurrentUser } from 'payload-auth-plugin/client/hooks'

export async function getUser() {
  const headers = await getHeaders()
  const payload: Payload = await getPayload({ config: await configPromise })
  const { user } = await payload.auth({ headers })

  // maybe only works with sessins. see code in gh
  // const user = await getCurrentUser({ name: 'app' }, { fields: ['name'] })

  return user || null
}
