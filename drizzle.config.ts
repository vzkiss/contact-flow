import type { Config } from 'drizzle-kit'
export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: { url: `./db/${process.env.DB_FILE_NAME ?? 'contacts.db'}` },
} satisfies Config
