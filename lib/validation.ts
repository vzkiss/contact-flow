import { z } from 'zod'

//prettier-ignore
export const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(100),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().trim().max(15, { message: 'Invalid phone number' }),
  avatar: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export const contactResponseSchema = z.object({
  id: z.number().int().positive(),
  createdAt: z.string(),
})

export type ContactResponse = z.infer<typeof contactResponseSchema>
