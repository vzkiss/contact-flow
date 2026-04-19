# Contact Flow

A contact management app built with Next.js, SQLite, and TanStack Query.

## Running locally

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:3000`.

The database is seeded automatically on first run (`pnpm db:seed` only inserts if the table is empty). The SQLite file `db/contacts.db` is committed to the repo so no database setup is needed.

To observe db run:

```bash
npx drizzle-kit studio
```

For a production build:

```bash
pnpm build   # runs db:migrate + db:seed + next build
pnpm start
```

## Deploying to Vercel

1. Create a Turso database via **Vercel Dashboard → Storage → Create → Turso** and link it to your project. This auto-injects `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` as environment variables.

2. Seed the remote database once (grab the values from **Vercel → Storage → your DB → `.env.local`**):

```bash
TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... pnpm db:migrate
TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... pnpm db:seed
```

3. Redeploy — the app will connect to Turso automatically.

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
| Database      | SQLite (local) / Turso (prod) | File-based locally; libSQL-compatible remote DB on Vercel   |
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

**Constraint error handling** — SQLite unique constraint violations on `phone` and `email` are caught at the API layer and returned as `409 Conflict` with a structured error response, surfaced to the user as specific toast messages ("Phone number is already in use") rather than generic failures.

## Project structure

```
.
├── app/
│   ├── api/
│   │   └── contact/
│   │       ├── route.ts           # GET (list) + POST (create)
│   │       └── [id]/
│   │           └── route.ts       # PUT (update) + DELETE (remove)
│   └── page.tsx                   # 3-column layout, sidebars hidden on mobile
├── db/
│   ├── schema.ts                  # Drizzle table definition + inferred types
│   └── contacts.db                # SQLite file (committed, auto-seeded)
├── features/
│   └── contact-flow/
│       ├── contact-header.tsx     # Title + "Add new" button
│       ├── contact-body.tsx       # Mounts list + dialog
│       ├── query.ts               # queryOptions + mutationOptions factories
│       └── components/
│           ├── contact-list.tsx   # Fetches + renders contacts, skeleton fallback
│           ├── contact-item.tsx   # Single row: avatar, name, phone, actions
│           ├── contact-form.tsx   # Add / edit dialog with validation
│           └── avatar-upload.tsx  # File → base64 data URL, preview + delete
├── stores/
│   └── contact-dialog-store.ts    # Zustand: open, contact, openAdd, openEdit, close
├── configs/
│   └── contact-fields.ts          # Form field definitions (name, phone, email)
├── lib/
│   ├── validations.ts             # drizzle-zod schema
│   └── helper.ts                  # Avatar src, initials, type guards
├── scripts/
│   └── seed-contacts.ts           # Idempotent seed (5 demo contacts with avatars)
└── README.md
```

## Extras implemented

- Vercel deploy: [contact-flow.vzkiss.com/](https://contact-flow.vzkiss.com/)
- Framer Motion: AnimatePresence on list add/remove/edit
- drizzle-zod: schema-derived validation, zero drift
- Skeleton loading: layout-stable loading state
- Minimal Toaster: for api feedback

> **S3 / Vercel Blob** — avatars are stored as base64 data URLs to keep the repo self-contained per the brief. Production path would be Vercel Blob or S3 with a stored URL reference.
>
> **Known:** avatar selection causes minor dialog height shift.

## Scripts

| Command        | What it does                             |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start dev server (auto-migrates + seeds) |
| `pnpm db:seed` | Re-seed demo contacts (idempotent)       |
| `pnpm build`   | Migrate + seed + production build        |
