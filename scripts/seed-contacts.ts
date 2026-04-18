import fs from 'node:fs'
import path from 'node:path'
import { db } from '../db/index'
import { contactsTable } from '../db/schema'

/**
 * Demo contacts from design assets: public/assets/[firstName].png
 *
 * Phone numbers are unique (schema enforces unique `phone`).
 * Set SEED_FORCE=1 to wipe and re-insert (e.g. local dev).
 */
const rows = [
  {
    name: 'Timothy Lewis',
    email: 'timothy.lewis@example.com',
    phone: '+36 20 100 0001',
    asset: 'Timothy.png',
  },
  {
    name: 'Sarah Wright',
    email: 'sarah.wright@example.com',
    phone: '+36 20 100 0002',
    asset: 'Sarah.png',
  },
  {
    name: 'Lucy Jones',
    email: 'lucy.jones@example.com',
    phone: '+36 20 100 0003',
    asset: 'Lucy.png',
  },
  {
    name: 'Jake Perez',
    email: 'jake.perez@example.com',
    phone: '+36 20 100 0004',
    asset: 'Jake.png',
  },
  {
    name: 'Adebayo Rodriguez',
    email: 'adebayo.rodriguez@example.com',
    phone: '+36 20 100 0005',
    asset: 'Adebayo.png',
  },
] as const

function avatarPathFromAsset(asset: string): string {
  const filePath = path.join(process.cwd(), 'public', 'assets', asset)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing avatar file: ${filePath}`)
  }
  return `/assets/${asset}`
}

async function main() {
  const force =
    process.env.SEED_FORCE === '1' || process.env.SEED_FORCE === 'true'

  const existing = await db
    .select({ id: contactsTable.id })
    .from(contactsTable)
    .limit(1)

  if (existing.length > 0 && !force) {
    console.log(
      `Skip seed: contacts table already has data (${process.env.DB_FILE_NAME ?? 'contacts.db'}). Set SEED_FORCE=1 to replace.`
    )
    return
  }

  if (force) {
    await db.delete(contactsTable)
  }

  await db.insert(contactsTable).values(
    rows.map((r) => ({
      name: r.name,
      email: r.email,
      phone: r.phone,
      avatar: avatarPathFromAsset(r.asset),
    }))
  )

  console.log(
    `Seeded ${rows.length} contacts into ${process.env.DB_FILE_NAME ?? 'contacts.db'}`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
