import type { Config } from 'drizzle-kit'
export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url:
      process.env.TURSO_DATABASE_URL ??
      `file:./db/${process.env.DB_FILE_NAME ?? 'contacts.db'}`,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config
