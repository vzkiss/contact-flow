import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'
import path from 'path'

const DB_FILE = process.env.DB_FILE_NAME ?? 'contacts.db'
const DB_PATH = path.join(process.cwd(), 'db', DB_FILE)

const sqlite = new Database(DB_PATH)

export const db = drizzle(sqlite, { schema })
