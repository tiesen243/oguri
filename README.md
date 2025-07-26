# oguri

A modern full-stack application built with TypeScript and Turbo.

## Tech Stack

### Frontend

- **React Router** - Declarative routing for React

### Build Tools

- **Turbo** - High-performance build system for JavaScript and TypeScript
- **TypeScript** - JavaScript with syntax for types
- **ESLint** - Linting utility for JavaScript and TypeScript
- **Prettier** - Opinionated code formatter
- **Bun** - Package manager

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:your-username/oguri.git
cd oguri
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

## Project Structure

```text
oguri/
├── apps/                    # Applications
│   └── react-router/        # React-router app
├── packages/                # Shared packages
│   ├── ui/                  # Shared shadcn/ui components
│   └── validators/          # Shared validation schemas
├── tools/                   # Build tools and configurations
│   ├── eslint/              # ESLint configuration
│   ├── prettier/            # Prettier configuration
│   └── typescript/          # TypeScript configuration
├── turbo.json               # Turbo configuration
└── package.json             # Root package.json
```

## Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production

# Code Quality
bun run lint         # Run ESLint
bun run typecheck    # Run TypeScript checks
```
