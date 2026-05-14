# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BenHub Vietnam** — landing page for a construction logistics platform (see `docs/PRD.md` for the full product spec). The stack has two separate applications:
- **Backend**: `src/backend/` — NestJS 11 + Prisma 7 + PostgreSQL + Redis (port **4000**)
- **Frontend**: `src/frontend/` — Next.js 16 + NextAuth v5 + Tailwind v4 + shadcn/ui (port **3000**)

## Commands

### Infrastructure (at repo root)
```bash
docker compose up -d   # Start PostgreSQL (5432) + Redis (6379)
docker compose down    # Stop services
```

### Backend (`src/backend/`) — package manager: npm
```bash
npm run start:dev                            # Hot reload (port 4000)
npm run build && npm run start:prod
npm run test                                 # All unit tests (Jest)
npm run test -- --testPathPattern=users      # Single test file match
npm run test:cov                             # Coverage report
npm run test:e2e                             # E2E tests
npx prisma migrate dev --name <description>  # Run after schema changes
npx prisma studio                            # Open Prisma Studio GUI
npm run lint                                 # ESLint --fix
```

### Frontend (`src/frontend/`) — package manager: pnpm
```bash
pnpm dev     # Dev server (port 3000)
pnpm build   # Production build
pnpm lint    # ESLint
```

## Backend Architecture

### Clean Architecture per module

Each feature lives in `src/modules/<name>/`:
```
<name>.module.ts
application/<name>.service.ts      ← business logic only
infrastructure/<name>.repository.ts ← extends BaseRepository
interface/<name>.controller.ts      ← HTTP mapping, @ApiTags, @ApiBearerAuth
interface/dto/
  create-<name>.dto.ts
  update-<name>.dto.ts              ← PartialType(Create...)
  <name>-query.dto.ts               ← extends PaginationDto
```

Never put business logic in controllers or raw Prisma calls in services.

### Global middleware (auto-applied to every route)
- `JwtAuthGuard` — JWT required by default; use `@Public()` to opt out (login, register, refresh, public GETs)
- `RolesGuard` — use `@Roles(Role.ADMIN)` for admin-only routes
- `ThrottlerGuard` — rate limiting via `THROTTLE_TTL` / `THROTTLE_LIMIT` env vars
- `TransformInterceptor` — wraps every response: `{ success, statusCode, timestamp, path, message, data, errors }`
- `AllExceptionsFilter` + `PrismaClientExceptionFilter` — normalizes errors

Controllers return `{ message: '...', data }` — the interceptor adds the outer wrapper. Do not replicate it in services.

### BaseRepository

Inject `prisma.<model>` as the delegate:
```typescript
constructor(prisma: PrismaService) {
  super(prisma, prisma.user as any);
}
```
- `softRemove({ id })` for user-facing deletes (sets `deletedAt`)
- Always filter `deletedAt: null` in `findAll` / `findOne` service queries
- `findAll()` returns `[T[], number]` (items + total count)

### Prisma schema conventions
- Every model: `id String @id @default(uuid())`, `createdAt`, `updatedAt`, `deletedAt DateTime?`
- Enums go above the models that use them
- Current models: `User`, `Product`, `Post` — enums: `Role`, `PostStatus`

### Caching pattern (Redis via `@nestjs/cache-manager`)
- Single entity key: `<model>_<id>` (e.g. `user_abc123`)
- List key: `<model>s_list_<JSON.stringify(query)>`
- TTL: 60000 ms default
- Invalidate on every write: delete both entity key and all tracked list keys
- See `UsersService` for the canonical cache invalidation pattern

### API endpoints
- Base: `http://localhost:4000/api/v1`
- Swagger: `http://localhost:4000/api/docs`
- Auth tokens: access 15m (`JWT_SECRET`), refresh 7d (`JWT_REFRESH_SECRET`)

### Leads module (to be built — see `docs/PRD.md` §6.2)
The primary unimplemented feature. `POST /api/v1/leads` — `@Public()`, accepts:
```typescript
{ segment, fullName, phone, email?, province?, fleetSize?, licensePlate?, companyName?, projectScale?, source, createdAt }
```
Needs a `Lead` Prisma model + `LeadsModule` following the standard module structure.

## Frontend Architecture

### Route groups
- `(marketing)/` — public landing page (home, about, contact) + the BenHub sections
- `(auth)/` — login / register
- `cms/` — protected admin dashboard

### Auth middleware
`src/proxy.ts` is the NextAuth middleware. It protects `/cms/**` and `/api/posts/**` — redirects unauthenticated users to `/login?callbackUrl=<path>`. Matches all routes except static assets.

NextAuth v5 calls `POST /api/v1/auth/login`, stores access + refresh tokens in the JWT session, and auto-refreshes the access token after 14 min (< 15m backend TTL). Session error `"RefreshAccessTokenError"` means the refresh token expired — force re-login.

### HTTP client
Use `src/lib/api.ts` for all backend calls. It handles `Authorization: Bearer`, throws `ApiError` on non-2xx, and reads `NEXT_PUBLIC_API_URL`.

### Path alias
`@/` maps to `src/frontend/src/` — use for all internal imports.

### In-memory Posts store
`src/app/api/posts/` is a local Next.js API route backed by `src/lib/posts-store.ts`. When a backend `PostsModule` is implemented, update the route handlers to proxy to `${NEXT_PUBLIC_API_URL}/api/v1/posts`.

### Forms
`react-hook-form` + `zod` + `@hookform/resolvers/zod`. Reference: `src/components/cms/PostForm.tsx`.

### Error/Loading boundaries
`src/app/cms/error.tsx`, `loading.tsx`, `dashboard/loading.tsx`, `posts/loading.tsx` exist. Add `error.tsx` + `loading.tsx` to every new CMS route.

### UI components
shadcn/ui in `src/components/ui/`. Custom components split: `cms/`, `marketing/`, `shared/`.

## BenHub Brand Identity

**Colors** (define as CSS vars in `globals.css`):
| Token | Hex | Use |
|---|---|---|
| Primary | `#F97316` | CTA buttons, accents |
| Secondary | `#FBBF24` | Secondary accent, icon backgrounds |
| Background dark | `#0F172A` | Hero, dark sections |
| Background mid | `#1E3A5F` | Mid-tone sections |
| Text muted | `#64748B` | Body text, sub-headings |

**Typography** (Google Fonts):
- Display / counters: **Barlow Condensed** 700–900
- Body headings + text: **Plus Jakarta Sans** 400–700

**Iconography:** Phosphor Icons (line style). Sections alternate dark (Navy) and light (White/Gray) backgrounds.

## Environment

### Backend (`src/backend/.env`)
Required: `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `REDIS_HOST`
Optional: `REDIS_PORT` (6379), `REDIS_PASSWORD`, `PORT` (4000), `THROTTLE_TTL`, `THROTTLE_LIMIT`, `CORS_ORIGIN`

### Frontend (`src/frontend/.env`)
Required: `AUTH_SECRET`, `NEXT_PUBLIC_API_URL=http://localhost:4000`

## ⚠️ Breaking changes to be aware of
- **Next.js 16**: May differ from training data. Read `node_modules/next/dist/docs/` before writing Next.js-specific code.
- **Tailwind CSS v4**: Configured entirely via `src/app/globals.css` — no `tailwind.config.js`.
- **Prisma 7**: Uses `@prisma/adapter-pg` with connection pooling in `PrismaService`. Instantiation and query API may differ from training data.
