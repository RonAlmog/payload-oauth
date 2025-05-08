import { Button } from '@payloadcms/ui'
import { signin } from 'payload-auth-plugin/client'

export const AuthComponent = () => {
  return (
    <form
      action={async () => {
        'use server'
        signin('google')
      }}
      method="GET"
      className="w-full"
    ></form>
  )
}
