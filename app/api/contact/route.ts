import { NextResponse } from 'next/server'
import { db } from '@/db'
import { contactsTable } from '@/db/schema'
import { contactSchema } from '@/lib/validations'
import { desc } from 'drizzle-orm'

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
  const [row] = await db.insert(contactsTable).values(data).returning()

  return NextResponse.json(row, { status: 201 })
}
