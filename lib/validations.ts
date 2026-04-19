import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { contactsTable } from '@/db/schema'
import { z } from 'zod'

// Generated directly from Drizzle schema — never drifts
// prettier-ignore
export const contactSchema = createInsertSchema(contactsTable, {
  name: z.string().min(5, { message: 'Name is required, min 5 characters' }).max(100),
  email: z.union([
    z.literal(''),
    z.string().email({ message: 'Invalid email' }),
  ]),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .max(30, { message: 'Invalid phone number' })
    .regex(/^\+?[0-9 ]+$/, { message: 'Phone number must contain digits only' }),
  avatar: z.string().optional(),
})

export const selectContactSchema = createSelectSchema(contactsTable)

export type ContactInput = z.infer<typeof contactSchema>
// export type Contact = z.infer<typeof selectContactSchema>
