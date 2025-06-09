// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { adminAuthPlugin, appAuthPlugin } from 'payload-auth-plugin'
import { GoogleAuthProvider, PasswordProvider } from 'payload-auth-plugin/providers'
import { AdminAccounts } from './collections/AdminAccounts'
import { AppUsers } from './collections/AppUsers'
import { AppAccounts } from './collections/AppAccounts'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterLogin: ['/components/AuthButton#AuthButton'],
    },
  },
  email: resendAdapter({
    defaultFromAddress: 'ron@realio.ca',
    defaultFromName: 'Admin',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  // **** Collections ***
  collections: [Users, Media, AdminAccounts, AppUsers, AppAccounts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // payloadCloudPlugin(),
    // storage-adapter-placeholder
    adminAuthPlugin({
      accountsCollectionSlug: AdminAccounts.slug,
      allowSignUp: true, // usually in production: false
      providers: [
        GoogleAuthProvider({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
      ],
    }),
    appAuthPlugin({
      name: 'app', // needs to match whatever is in auth.ts
      allowAutoSignUp: true,
      secret: process.env.APP_AUTH_SECRET as string,
      usersCollectionSlug: AppUsers.slug,
      accountsCollectionSlug: AppAccounts.slug,
      providers: [
        PasswordProvider(),
        GoogleAuthProvider({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
      ],
    }),
  ],
})
