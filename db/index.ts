import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'
import path from 'path'

const DB_FILE = process.env.DB_FILE_NAME ?? 'contacts.db'
const DB_PATH = `file:${path.join(process.cwd(), 'db', DB_FILE)}`

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? DB_PATH,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })
