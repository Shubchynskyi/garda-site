# GARDA site

Minimal Vite + React + Tailwind site for Netlify.

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Netlify

This repo includes `netlify.toml`.

Expected settings:
- Build command: `npm run build`
- Publish directory: `dist`

## Deploy flow

1. Create a new GitHub repo
2. Upload these files
3. Push to `main`
4. Import the repo in Netlify
5. Netlify will build and deploy automatically
