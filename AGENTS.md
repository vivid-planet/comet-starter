# AGENTS.md

This file provides guidance to AI agents (Copilot, Cursor, Claude) when working with code in this repository.

## Keeping This File Up to Date

When making changes that affect project structure, commands, architecture, ports, conventions, or configuration, update the relevant section of this file to reflect the new state. This includes:

- Adding or removing packages/services
- Changing commands or scripts
- Introducing new patterns or conventions
- Modifying ports, environment files, or Docker services
- Updating tooling or linting configuration

## Project Overview

This is a monorepo containing a Comet DXP project. It contains three main packages:

- **api/** - NestJS GraphQL backend with MikroORM/PostgreSQL
- **admin/** - React admin interface with Vite and MUI
- **site/** - Next.js frontend (App Router)

## Common Commands

**Important:** Always use the correct Node version before executing any pnpm command or ./install.sh. Run `nvm use` in the project root to do so.

### Setup

```bash
./install.sh                     # Full installation
```

Use `./install.sh` instead of `pnpm install` whenever you add, remove, or update dependencies in any `package.json` file.

### Development

```bash
pnpm run dev                      # Start all services via dev-pm
pnpm exec dev-pm status                # Show service status
pnpm exec dev-pm logs <service>        # Tail service logs
pnpm exec dev-pm restart <service>     # Restart a service
pnpm exec dev-pm shutdown              # Stop all services
```

### Building

```bash
pnpm run build                    # Build all packages
pnpm --dir api run build       # Build API (includes api-generator)
pnpm --dir admin run build     # Build Admin
pnpm --dir site run build      # Build Site
```

### Linting

```bash
pnpm run lint                     # Lint all packages
pnpm --dir api run lint        # Lint API
pnpm --dir admin run lint      # Lint Admin
pnpm --dir site run lint       # Lint Site (includes stylelint)
```

### Linting and Formatting (Auto-fix)

```bash
pnpm run lint:fix                     # Auto-fix all packages
pnpm --dir api run lint:fix        # Auto-fix API
pnpm --dir admin run lint:fix      # Auto-fix Admin
pnpm --dir site run lint:fix       # Auto-fix Site (includes stylelint)
```

These commands auto-fix import sorting, remove unused imports, and apply Prettier formatting. The root `lint:fix` also formats config files outside the packages.

### Testing (API only currently)

```bash
pnpm --dir api run test                              # Run all tests
pnpm --dir api run test -- src/path/to/file.spec.ts  # Run specific test file
pnpm --dir api run test -- --testNamePattern="name"  # Run tests matching pattern
pnpm --dir api run test:watch                        # Watch mode
```

### Database

```bash
pnpm --dir api run db:migrate                   # Run migrations
pnpm --dir api run fixtures                     # Load test fixtures
pnpm --dir api run repl                         # Interactive REPL
pnpm --dir api run mikro-orm migration:create   # Create new migration
```

### Code Generation

```bash
pnpm --dir admin run admin-generator   # Execute admin generator. Generates grid and form react components based on .cometGen.ts(x) files
pnpm --dir api run api-generator       # Execute api generator. Generates resolvers, DTOs, etc. for new entities with the @CrudGenerator decorator
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

Each package has its own `node_modules` - this is not a pnpm workspace monorepo. Install dependencies per-package with `pnpm --dir <package> install`.

The package manager is **pnpm**, pinned via the `packageManager` field in each `package.json` (enable it with `corepack enable pnpm`). Each package keeps its own `pnpm-lock.yaml`; there is intentionally no root `pnpm-workspace.yaml`.

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
- knip for unused exports detection

### Environment Files

- `.env` - Development defaults
- `.env.local` - Local overrides (not committed)
- `.env.site-configs` - Multi-tenant configuration

## Key Patterns

### Post-Change Workflow

After making code changes, always run `pnpm --dir <package> run lint:fix` for each affected package. This auto-fixes import ordering, removes unused imports, and applies Prettier formatting. Run this before committing or presenting changes as complete.

### API Module Structure

Feature-based organization: `auth/`, `documents/`, `dam/`, `menus/`, `footers/`, `redirects/`, `healthcheck/`

### Admin Structure

Component-based with GraphQL mutations/queries co-located

### Site Structure

Next.js App Router conventions with pages in `app/`

## References

This project is derived from the [Comet Starter](https://github.com/vivid-planet/comet-starter) repo and may have diverged over time. When implementing or refactoring features, consult the starter for current best-practice patterns. The repo follows the same `api/`, `admin/`, `site/` structure, so equivalent files can be found at matching paths.

To browse the starter repo, use the GitHub API:

- List a directory: `https://api.github.com/repos/vivid-planet/comet-starter/contents/{path}`
- Fetch a file: `https://raw.githubusercontent.com/vivid-planet/comet-starter/main/{path}`

Comet DXP documentation is available at https://docs.comet-dxp.com/docs/ - search for relevant pages with `site:docs.comet-dxp.com {topic}`.
