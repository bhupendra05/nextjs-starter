# nextjs-starter

> Production Next.js 14 App Router starter with TypeScript, Tailwind CSS, Auth.js v5, Prisma ORM, API routes, middleware-based auth guards, and Docker. Clone and build your app without boilerplate setup.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Next.js 14 App Router** — Server Components, Server Actions, streaming, layouts
- **Auth.js v5 (NextAuth)** — Email/password + GitHub + Google OAuth, JWT sessions
- **Prisma ORM** — Type-safe PostgreSQL queries, migrations, Prisma Studio
- **Tailwind CSS** — Utility-first styling, dark mode ready
- **Middleware** — Auth guards protecting routes, redirect to login
- **API Routes** — REST endpoints with Zod validation
- **Docker** — Multi-stage build (deps → build → minimal runtime), non-root user
- **TypeScript** — Strict mode, full type safety
- **Health check** — `GET /api/health` checks DB connection

## Quick Start

```bash
git clone https://github.com/bhupendra05/nextjs-starter.git myapp
cd myapp

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_SECRET

# Setup database
npx prisma migrate dev --name init

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page (Server Component)
│   ├── dashboard/                # Protected route
│   ├── (auth)/
│   │   ├── login/page.tsx        # Sign in page
│   │   └── register/page.tsx     # Registration page
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/    # Auth.js route handler
│       │   └── register/         # POST /api/auth/register
│       └── health/               # GET /api/health
├── lib/
│   ├── auth.ts                   # Auth.js config (providers, callbacks)
│   └── db.ts                     # Prisma client singleton
├── middleware.ts                  # Auth guards + redirects
└── components/
    ├── ui/                       # Reusable UI components
    └── providers.tsx             # Client providers wrapper
prisma/
└── schema.prisma                 # User, Account, Session models
```

## Authentication

### Email/Password

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'

# Login (via API)
curl -X POST http://localhost:3000/api/auth/session
```

### OAuth (GitHub / Google)

1. Create OAuth app on GitHub/Google
2. Add credentials to `.env`
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`

### Protecting Routes

Routes under `/dashboard`, `/settings`, `/profile` require authentication.
Middleware redirects unauthenticated users to `/login`.

To protect additional routes, edit `src/middleware.ts`:

```typescript
const PROTECTED_ROUTES = ["/dashboard", "/settings", "/admin"];
```

To protect a Server Component directly:

```typescript
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();
  if (!session) redirect("/login");
  return <div>Hello {session.user.name}</div>;
}
```

## Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes (dev)
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio (GUI)
npm run db:studio
```

## Docker

```bash
# Build
docker build -t myapp .

# Run
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e AUTH_SECRET="..." \
  myapp
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | Random secret for JWT signing |
| `GITHUB_CLIENT_ID` | Optional | GitHub OAuth app ID |
| `GITHUB_CLIENT_SECRET` | Optional | GitHub OAuth app secret |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret |

## License

MIT © bhupendra05
