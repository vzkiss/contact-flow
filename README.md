# Contact Flow

A contact management app built with Next.js, SQLite, and TanStack Query.

## Running locally

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:3000`.

The database is seeded automatically on first run (`pnpm db:seed` only inserts if the table is empty). The SQLite file `db/contacts.db` is committed to the repo so no database setup is needed.

For a production build:

```bash
pnpm build   # runs db:migrate + db:seed + next build
pnpm start
```

## Architecture

```
Browser
  └── React (Next.js App Router)
        ├── TanStack Query          ← cache, mutations, invalidation
        ├── TanStack Form + Zod     ← form state + validation
        └── Zustand                 ← dialog open/close state

Next.js API Routes (/app/api/contact)
  └── Drizzle ORM
        └── SQLite (db/contacts.db)
```

Request flow for a contact update:

```
ContactForm → PUT /api/contact/[id] → Drizzle → SQLite
                                            ↓
                        TanStack Query invalidates ['contacts','list']
                                            ↓
                                  ContactList re-fetches
```

## Tech stack choices

| Layer         | Choice                  | Why                                                              |
| ------------- | ----------------------- | ---------------------------------------------------------------- |
| Framework     | Next.js (App Router)    | Co-locates API routes with the UI; no separate server process    |
| Database      | SQLite + better-sqlite3 | Zero-config, single file, reviewable in the repo                 |
| ORM           | Drizzle ORM             | Thin and type-safe; schema is the source of truth                |
| Data fetching | TanStack Query          | Handles caching, background refetch, and optimistic invalidation |
| Form          | TanStack Form           | Headless; pairs well with Zod for field-level errors             |
| State         | Zustand                 | Minimal global state (dialog open/closed + current contact)      |
| Styling       | Tailwind CSS 4          | Utility-first; co-located with markup                            |
| Animations    | Motion (Framer)         | Declarative enter/exit transitions on contact list items         |

## Notable implementation details

**drizzle-zod** — `contactSchema` in `lib/validations.ts` is generated directly from the Drizzle table definition via `createInsertSchema`, so the validation rules and the database columns can never silently drift apart.

**Query key factory** — `queryKeys` in `features/contact-flow/query.ts` centralises all cache keys (`['contacts']`, `['contacts','list']`) so every mutation invalidates the exact right scope without scattered string literals.

**Skeleton loading** — `ContactItemSkeleton` in `features/contact-flow/components/contact-list.tsx` renders two placeholder rows (circular avatar + two lines) while the initial fetch is in-flight, matching the shape of a real contact item so the layout does not shift on load.

## Project structure

```
app/
  api/contact/          # GET + POST
  api/contact/[id]/     # PUT + DELETE
  page.tsx              # 3-column layout (sidebars hidden on mobile)
db/
  schema.ts             # Drizzle table + inferred types
  contacts.db           # SQLite file (committed)
features/contact-flow/
  contact-header.tsx    # Title + "Add new" button
  contact-body.tsx      # Mounts list + dialog
  components/
    contact-list.tsx    # Fetches + renders contacts, skeleton fallback
    contact-item.tsx    # Single row: avatar, name, phone, actions
    contact-form.tsx    # Add / edit dialog with validation
    avatar-upload.tsx   # File → base64 data URL, preview + delete
  query.ts              # queryOptions + mutationOptions factories
lib/
  validations.ts        # drizzle-zod schema
  helper.ts             # Avatar display src, initials, type checks
stores/
  contact-dialog-store.ts  # Zustand: open, contact, openAdd, openEdit, close
configs/
  contact-fields.ts     # Form field definitions (name, phone, email)
scripts/
  seed-contacts.ts      # Idempotent seed (5 demo contacts with avatars)
```
