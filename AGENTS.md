# AGENTS.md

This file provides guidance to AI agents (Copilot, Cursor, Claude) when working with code in this repository.

## Project Overview

This is a monorepo containing a Comet DXP project. It contains three main packages:

- **api/** - NestJS GraphQL backend with MikroORM/PostgreSQL
- **admin/** - React admin interface with Vite and MUI
- **site/** - Next.js frontend (App Router)

## Common Commands

### Setup

```bash
./install.sh                     # Full installation
```

### Development

```bash
nvm install                      # Install and use Node version from .nvmrc (use instead of nvm use to avoid "not installed" errors)
npm run dev                      # Start all services via dev-pm
npx dev-pm status                # Show service status
npx dev-pm logs <service>        # Tail service logs
npx dev-pm restart <service>     # Restart a service
npx dev-pm shutdown              # Stop all services
```

### Building

```bash
npm run build                    # Build all packages
npm --prefix api run build       # Build API (includes api-generator)
npm --prefix admin run build     # Build Admin
npm --prefix site run build      # Build Site
```

### Linting

```bash
npm run lint                     # Lint all packages
npm --prefix api run lint        # Lint API
npm --prefix admin run lint      # Lint Admin
npm --prefix site run lint       # Lint Site (includes stylelint)
```

### Testing (API only currently)

```bash
npm --prefix api run test                              # Run all tests
npm --prefix api run test -- src/path/to/file.spec.ts  # Run specific test file
npm --prefix api run test -- --testNamePattern="name"  # Run tests matching pattern
npm --prefix api run test:watch                        # Watch mode
```

### Database

```bash
npm --prefix api run db:migrate                   # Run migrations
npm --prefix api run fixtures                     # Load test fixtures
npm --prefix api run repl                         # Interactive REPL
npm --prefix api run mikro-orm migration:create   # Create new migration
```

### Code Generation

```bash
npm --prefix admin run admin-generator   # Execute admin generator. Generates grid and form react components based on .cometGen.ts(x) files
npm --prefix api run api-generator       # Execute api generator. Generates resolvers, DTOs, etc. for new entities with the @CrudGenerator decorator
```

## Architecture

### Package Structure

- `admin/src/` - React admin UI (App.tsx entry, documents/, footers/, dashboard/)
- `api/src/` - NestJS modules (auth/, documents/, page-tree/, menus/, content-generation/)
- `api/db/migrations/` - Database migrations
- `site/src/app/` - Next.js app router
- `site/src/middleware.ts` - Domain routing, CSP headers
- `site-configs/site-configs.ts` - Multi-tenant site configuration

### Package Independence

Each package has its own `node_modules` - this is not an npm workspace monorepo. Install dependencies per-package with `npm --prefix <package> install`.

### Path Aliases

All packages use `@src/*` to map to their local `src/` directory (configured in tsconfig.json).

### Multi-tenancy

The `site-configs/` directory manages site configurations, compiled into environment at build time.

### Docker Services

- PostgreSQL (port 5432)
- imgproxy (port 6080) - image optimization
- Jaeger (port 16686) - distributed tracing

### Local Ports

- Admin: 8000
- API: 4000
- Site: 3000

### Code Quality

- ESLint with flat config format
- Prettier: 150 print width, 4 tab width
- Strict TypeScript enabled
- Pre-commit hooks via husky/lint-staged

## Configuration

### TypeScript

- API targets ES2017
- Admin uses ESNext with @emotion/react JSX transform
- Site targets ES5 for browser compatibility

### Linting Stack

- ESLint (flat config, .mjs files) using `@comet/eslint-config` presets
- Prettier
- stylelint for Site SCSS/CSS
- cspell for spell checking
- knip for unused exports detection

### Environment Files

- `.env` - Development defaults
- `.env.local` - Local overrides (not committed)
- `.env.site-configs` - Multi-tenant configuration

## Key Patterns

### API Module Structure

Feature-based organization: `auth/`, `documents/`, `dam/`, `menus/`, `footers/`, `redirects/`, `status/`

### Admin Structure

Component-based with GraphQL mutations/queries co-located

### Site Structure

Next.js App Router conventions with pages in `app/`
