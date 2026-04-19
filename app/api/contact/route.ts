import { NextResponse } from 'next/server'
import { db } from '@/db'
import { contactsTable } from '@/db/schema'
import { contactSchema } from '@/lib/validations'
import { desc } from 'drizzle-orm'

function isUniqueConstraintError(e: unknown): e is Error {
  return e instanceof Error && e.message.includes('UNIQUE constraint failed')
}

function uniqueConstraintMessage(e: Error) {
  if (e.message.includes('contacts.phone')) return 'Phone number is already in use'
  if (e.message.includes('contacts.email')) return 'Email address is already in use'
  return 'A contact with these details already exists'
}

/**
 * GET /api/contact
 * @returns A list of contacts
 */
export async function GET() {
  const rows = await db
    .select()
    .from(contactsTable)
    .orderBy(desc(contactsTable.createdAt))

  return NextResponse.json(rows)
}

/**
 * POST /api/contact
 * @param req - The request body
 * @returns The created contact
 */
export async function POST(req: Request) {
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const data = { ...parsed.data, email: parsed.data.email || null }

  try {
    const [row] = await db.insert(contactsTable).values(data).returning()
    return NextResponse.json(row, { status: 201 })
  } catch (e) {
    if (isUniqueConstraintError(e))
      return NextResponse.json(
        { error: uniqueConstraintMessage(e) },
        { status: 409 }
      )
    throw e
  }
}
