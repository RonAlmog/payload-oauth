import type { CollectionConfig } from 'payload'
import { withAppUsersCollection } from 'payload-auth-plugin/collection'
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'

export const AppUsers: CollectionConfig = withAppUsersCollection({
  slug: 'app-users',
  auth: true, // withAppUsersCollection is taking care of this?
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email'],
  },
  fields: [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: ['user', 'superuser'],
      required: false,
    },
  ],
  hooks: {
    afterDelete: [deleteLinkedAccounts('app-accounts')],
  },
})
