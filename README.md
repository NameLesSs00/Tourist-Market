This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

| Variable | Where it is read | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `clientApi/apiConfig.ts` | Backend origin (defaults to `https://touristtt.runasp.net/api`). |
| `NEXT_PUBLIC_BACKEND_ORIGIN` | `shared/utils/imageUrl.ts` | Origin used to make stored `/uploads/...` image paths absolute. |
| `NEXT_PUBLIC_SITE_URL` | `shared/utils/siteConfig.ts` | **Canonical public origin.** Feeds every `rel=canonical`, `hreflang`, Open Graph `og:url`, `robots.txt`, `sitemap.xml` and JSON-LD `@id`. |

`NEXT_PUBLIC_SITE_URL` rules:

- Production: set it to `https://touristmarket-egypt.com` (no trailing slash). If it is unset, the code already falls back to that value.
- Preview, staging and local builds: either leave it unset **and** rely on the `NODE_ENV` guard, or set it to the deployment's own host. `IS_INDEXABLE` is only true when the host really is `touristmarket-egypt.com` **and** the build is production, so a preview deployment must never set `NEXT_PUBLIC_SITE_URL` to the production host - that would make it emit indexable canonicals and an indexable `robots.txt`.
- When `IS_INDEXABLE` is false, every page gets `noindex, nofollow` and `robots.txt` disallows all crawling.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
