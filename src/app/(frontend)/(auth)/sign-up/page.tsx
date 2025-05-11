import React, { ReactElement } from 'react'
import SignUpClient from './sign-up-client'

export default async function Page(): Promise<ReactElement> {
  return <SignUpClient />
}
