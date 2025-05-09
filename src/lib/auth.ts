import { appClient } from 'payload-auth-plugin/client'
import { getCurrentUser } from 'payload-auth-plugin/client/hooks'

const { signin, refresh } = appClient({ name: 'app' })

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
