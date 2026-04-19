import type { Config } from 'drizzle-kit'
export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      `file:./db/${process.env.DB_FILE_NAME ?? 'contacts.db'}`,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config
