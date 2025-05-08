import type { CollectionConfig } from 'payload'
import { withAdminAccountCollection } from 'payload-auth-plugin/collection'
import { Users } from './Users'

export const AdminAccounts: CollectionConfig = withAdminAccountCollection(
  {
    slug: 'admin-accounts',
  },
  Users.slug,
)
