import { NextResponse } from 'next/server'
import { db } from '@/db'
import { contactsTable } from '@/db/schema'
import { contactSchema } from '@/lib/validations'
import { desc } from 'drizzle-orm'

export async function GET() {
  const rows = await db
    .select()
    .from(contactsTable)
    .orderBy(desc(contactsTable.createdAt))
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten() },
      { status: 422 }
    )
  }
  const [row] = await db.insert(contactsTable).values(parsed.data).returning()
  return NextResponse.json(row, { status: 201 })
}
