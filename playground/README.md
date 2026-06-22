# Grund Playground

A small Next.js app for developing and previewing the Grund design system —
the token gallery, components, and patterns — without needing a downstream
consumer app.

It lives inside the Grund repo and imports tokens directly from one level up
(`../src/tokens`, aliased as `@grund/*`), so changes to the design system show
up live.

## Develop

```bash
cd playground
npm install
npm run dev
```

Then open http://localhost:3002.

(The playground runs on port **3002** to avoid colliding with other local
servers on the default 3000.)

## What's here

- **Token gallery** (`/`) — renders the current `src/tokens.ts`: what's defined
  vs. still a placeholder.
- **Components / Patterns** — stub sections that fill in as those layers are
  built.

## Notes

- Next 15 (App Router) + TypeScript + Tailwind CSS v4.
- `experimental.externalDir` is enabled so Next can transpile token source files
  that live outside the playground's own root.
- Deployed separately (Vercel root directory → `playground/`).
- **Not indexed by search engines** while it's a development surface — blocked
  via a `noindex` robots meta tag, an `X-Robots-Tag` response header, and a
  disallow-all `robots.txt`.
