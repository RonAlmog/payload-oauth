import type { CollectionConfig } from 'payload'
import { withAppAccountCollection } from 'payload-auth-plugin/collection'
import { AppUsers } from './AppUsers'

export const AppAccounts: CollectionConfig = withAppAccountCollection(
  {
    slug: 'app-accounts',
    admin: {
      useAsTitle: 'id',
    },
  },
  AppUsers.slug,
)
