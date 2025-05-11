import type { CollectionConfig } from 'payload'
import { withAppUsersCollection } from 'payload-auth-plugin/collection'
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'

export const AppUsers: CollectionConfig = withAppUsersCollection({
  slug: 'app-users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email'],
  },
  hooks: {
    afterDelete: [deleteLinkedAccounts('app-accounts')],
  },
})
