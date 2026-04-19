import { NextResponse } from 'next/server'
import { db } from '@/db'
import { contactsTable } from '@/db/schema'
import { contactSchema } from '@/lib/validations'
import { eq } from 'drizzle-orm'

function isUniqueConstraintError(e: unknown) {
  return e instanceof Error && e.message.includes('UNIQUE constraint failed')
}

function uniqueConstraintMessage(e: Error) {
  if (e.message.includes('contacts.phone')) return 'Phone number is already in use'
  if (e.message.includes('contacts.email')) return 'Email address is already in use'
  return 'A contact with these details already exists'
}

type Params = { params: Promise<{ id: string }> }

/**
 * PUT /api/contact/[id]
 * @param params - The parameters
 * @returns The updated contact
 */
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId < 1)
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

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
    const [row] = await db
      .update(contactsTable)
      .set(data)
      .where(eq(contactsTable.id, numId))
      .returning()

    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(row, { status: 200 })
  } catch (e) {
    if (isUniqueConstraintError(e))
      return NextResponse.json(
        { error: uniqueConstraintMessage(e) },
        { status: 409 }
      )
    throw e
  }
}

/**
 * DELETE /api/contact/[id]
 * @param params - The parameters
 * @returns The response
 */
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId < 1)
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  await db.delete(contactsTable).where(eq(contactsTable.id, numId))
  return new NextResponse(null, { status: 204 })
}
