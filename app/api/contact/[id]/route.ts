import { NextResponse } from 'next/server'
import { db } from '@/db'
import { contactsTable } from '@/db/schema'
import { contactSchema } from '@/lib/validations'
import { eq } from 'drizzle-orm'

type Params = { params: Promise<{ id: string }> }

/**
 * PUT /api/contact/[id]
 * @param params - The parameters
 * @returns The updated contact
 */
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const [row] = await db
    .update(contactsTable)
    .set(parsed.data)
    .where(eq(contactsTable.id, Number(id)))
    .returning()

  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(row)
}

/**
 * DELETE /api/contact/[id]
 * @param params - The parameters
 * @returns The response
 */
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params
  await db.delete(contactsTable).where(eq(contactsTable.id, Number(id)))
  return new NextResponse(null, { status: 204 })
}
