# Scribe - Markdown-Based Blogging Platform

## Overview

Scribe is a production-ready blogging website built with a modern full-stack architecture. The platform uses a file-based content management system where blog posts are written as Markdown files with YAML frontmatter. Content can be added, edited, or deleted simply by managing `.md` files in the `/content/posts/` directory - no database required for content storage.

The application features a React frontend with a clean, typography-focused design optimized for reading, and an Express backend that serves the markdown content via REST API endpoints.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state and caching
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Typography**: Merriweather (serif) for headings, Inter (sans-serif) for body text
- **Animations**: Framer Motion for page transitions and micro-interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for validation
- **Content Processing**: gray-matter library parses Markdown frontmatter on the server
- **File Storage**: FileStorage class in `server/storage.ts` reads and caches markdown files with a 1-minute TTL

### Content Management System
- Blog posts live in `/content/posts/` as `.md` files
- Each file includes YAML frontmatter with: title, slug, description, category, author, date, featuredImage
- Fixed categories: Technology, Lifestyle, Business, Education, Real Estate
- Content is parsed at runtime and cached server-side

### Client-Side Content Loading
- Vite's `import.meta.glob` bundles markdown files at build time for the client
- The `client/src/lib/posts.ts` module provides static access to all posts
- Hooks in `client/src/hooks/use-blog.ts` wrap React Query for data fetching

### Database Configuration
- Drizzle ORM is configured with PostgreSQL for potential future features (user sessions, comments, etc.)
- The schema in `shared/schema.ts` currently defines types for blog posts but uses file-based storage
- Database connection requires `DATABASE_URL` environment variable

### Build System
- Development: `tsx` runs TypeScript directly
- Production: Custom build script bundles server with esbuild, client with Vite
- Output: `dist/` directory with `index.cjs` (server) and `public/` (client assets)

## External Dependencies

### Database
- **PostgreSQL**: Required for session storage and potential future features
- **Drizzle ORM**: Database toolkit with type-safe queries
- **connect-pg-simple**: PostgreSQL session store for Express

### Frontend Libraries
- **@tanstack/react-query**: Async state management
- **react-markdown**: Renders markdown content in React
- **date-fns**: Date formatting utilities
- **framer-motion**: Animation library
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)

### Backend Libraries
- **Express**: Web server framework
- **gray-matter**: Parses YAML frontmatter from markdown files
- **Zod**: Runtime type validation for API contracts

### Build Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the stack