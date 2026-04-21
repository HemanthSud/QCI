# Queen City Ishaare Site

A polished multi-page marketing site for Queen City Ishaare built with:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

## Run it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Main routes

- `/`
- `/about`
- `/support`
- `/calendar`
- `/gallery`

## Where to update content

Most site copy, links, milestones, and card data live in:

`src/lib/site-data.ts`

That is the first file to edit if you want to:

- swap in official team history
- update the fundraiser link
- add current season dates
- replace placeholder gallery card copy
- change the contact email or Instagram URL

## Main design files

- `src/app/globals.css`
- `src/components/site-chrome.tsx`
- `src/components/ui.tsx`
- `src/app/page.tsx`

## Verification

This repo currently passes:

- `npm run lint`
- `npm run build`
