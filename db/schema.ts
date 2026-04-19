import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

//prettier-ignore
export const contactsTable = sqliteTable('contacts', {
  id        : integer('id').primaryKey({ autoIncrement: true }),
  name      : text('name').notNull(),
  email     : text('email').unique(),
  phone     : text('phone').notNull().unique(),
  avatar    : text('avatar'),             // image as data URL (base64), same as upload
  createdAt : integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt : integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})

export type Contact = typeof contactsTable.$inferSelect
export type NewContact = typeof contactsTable.$inferInsert
export type UpdateContact = Omit<Contact, 'createdAt' | 'updatedAt'>
