<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
you are not allowed to open any browser to validate work 

## Project Architecture & Directory Structure Rules

All code contributions must strictly adhere to this folder structure to maintain clean separation of concerns and high scalability:

```
tourist-market/
├── app/                      # NEXT.JS ROUTING ONLY (Pages & Layouts, NO components)
│   ├── [locale]/             # Public / Client routes with i18n support
│   │   ├── page.tsx          # Home page route
│   │   ├── blogs/page.tsx    # Blogs page route
│   │   ├── about/page.tsx    # About page route
│   │   └── contact/page.tsx  # Contact page route
│   ├── admin/                # Admin area routes
│   │   ├── login/page.tsx    # Admin login route
│   │   └── dashboard/page.tsx# Admin dashboard route
│   ├── globals.css           # Global Tailwind CSS v4 styling
│   └── layout.tsx            # Root layout
│
├── components/               # ALL UI COMPONENTS (Separated by context)
│   ├── UserComp/             # User / Client page components
│   │   ├── Home/             # Components used on Home page
│   │   ├── About/            # Components used on About page
│   │   ├── Blogs/            # Components used on Blogs page
│   │   └── Contact/          # Components used on Contact page
│   └── adminComp/            # Admin page components
│       ├── Login/            # Components used on Admin Login
│       └── Dashboard/        # Components used on Admin Dashboard
│
├── clientApi/                # BACKEND & HTTP CLIENT CONFIGURATION (Renamed from api/ to avoid Vercel serverless function misdetection)
│   ├── apiConfig.ts          # Central Axios configuration, baseURL switcher (sandbox/temp/prod)
│   └── ...api modules        # Domain-specific endpoint calls
│
├── models/                   # TYPESCRIPT TYPES & INTERFACES (Data contracts with backend)
│   └── ...domain models      # DTOs, entity interfaces, and API response types
│
├── features/                 # FEATURE-DRIVEN BUSINESS LOGIC
│   └── ...feature modules    # Custom hooks, TanStack Query hooks, Zustand state slices
│
└── shared/                   # REUSABLE ACROSS FEATURES & COMPONENTS
    ├── providers/            # React Query providers, Theme providers, etc.
    └── utils/                # Utility helper functions
```

### Critical Placement Rules:
1. **`app/` is strictly for Routing**:
   - Only `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` are allowed in `app/`.
   - Never define UI components directly inside `app/`. Every page must import and render components from `@/components/UserComp/...` or `@/components/adminComp/...`.
2. **Components Division**:
   - Client/public facing UI belongs in `components/UserComp/<FeatureName>/`.
   - Admin facing UI belongs in `components/adminComp/<FeatureName>/`.
3. **API & Config**:
   - All network requests must flow through `clientApi/` using the centralized configuration in `clientApi/apiConfig.ts`. Never hardcode raw endpoint URLs in components or hooks.
4. **Data Models**:
   - All backend data structures, DTOs, and schema interfaces belong in `models/`.
5. **Features & Shared**:
   - Encapsulate TanStack Query queries/mutations and Zustand stores inside `features/`.
   - Place cross-cutting providers (e.g. QueryClientProvider) and common utilities in `shared/`.
do not ever commit to main unless i tell you