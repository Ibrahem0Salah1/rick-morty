# Rick and Morty Explorer

A Next.js app for browsing characters and locations from the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql).

## Running locally

```bash
git clone <repo-url>
cd <repo-name>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required — the app talks directly to the public Rick and Morty GraphQL API (`https://rickandmortyapi.com/graphql`).

## Why App Router

I went with the App Router instead of Pages Router mainly for one reason: server components let me fetch the first page of data on the server and hand it straight to the client as `initialData`, without needing `getServerSideProps` or a client-side loading flash on first paint.

It also made layout composition cleaner: the header/footer live in `app/layout.tsx` once, and each route (`/characters`, `/locations`, `/characters/[id]`) only owns what's actually different about it. Character and location *detail* pages (`[id]`) are plain server components with no client-side fetching at all — there's no pagination or search state on those pages, so React Query would've been unneeded complexity there. I only reach for `"use client"` where there's genuine interactivity: search, filters, pagination, the location sheet.

## React Query + nuqs

My default pattern for any "browse and filter" page is: **URL is the single source of truth for filter state, React Query owns server state, and the two are connected through nuqs.** I don't keep filters in `useState` — if it's not in the URL, refreshing the page or sharing a link loses it, which felt wrong for something like "here's page 3 of characters filtered by Alive."

The workflow, step by step:

1. **Define the filter shape once**, server-safe, with `nuqs/server`'s `createSearchParamsCache` (e.g. `page`, `q`, `status` for characters). This gets reused on both the server (parsing `searchParams` in the page component for SSR) and the client (via a `useQueryStates` hook), so there's one definition of "what a filter is," not two.
2. **A thin client hook** (`useCharctersFilters`) wraps `useQueryStates` so any component can read/write filters.
3. **The page (server component)** parses `searchParams` with the cache, fetches page 1 of data server-side with those filters, and passes it down as `initialData`.
4. **The data hook** (`useCharacters`) reads filters from nuqs, builds the React Query key from them (`["characters", vars]`), and fetches. Any UI that changes a filter (search input, status filters, pagination) => just calls `setFilters(..[eg.. q="rick"]..)`  that changes the URL => which changes the query key => which triggers a refetch automatically `reactQuery` . No manual "refetch on filter change" logic anywhere.

One thing I had to get right here: `initialData` in React Query isn't scoped to a specific query key — if passed unconditionally, it silently seeds *every* new query key (e.g. after paginating) with the original SSR data instead of fetching fresh data for the new filters. I fixed this by only applying `initialData` when the current filters still match the ones the page was server-rendered with `the default paramters keys`; otherwise it's `undefined` and the query behaves like a normal client fetch.

## The location cache problem

Clicking a location card opens a right-side sheet with that location's full detail (including residents). My first pass gave the sheet its own `useQuery` that refetched `location(id)` on every click — but the list query (`locations`) already returns the exact same fields per location. That's a pointless network round-trip for data already sitting in memory.

The fix: **check React Query's cache for the location before fetching.** `queryClient.getQueriesData` scans every cached `locations` query (across all paginated/infinite pages the user has loaded) for a matching id. If found, the sheet renders instantly with zero network calls `literally 8ms response` . If not found — the one real edge case, someone opening `/locations?location=57` as a fresh link with nothing cached yet — `useQuery` is conditionally enabled as a fallback and fetches it for real. So it's "cache-first, fetch as a fallback," not one or the other.

## Pagination strategy: both, on purpose

Characters uses classic page-number pagination (`page` in the URL, a `Pagination` component); locations uses `useInfiniteQuery` with a "load more" button. Both talk to APIs with identical shapes (`info { pages, next }`), so this wasn't a technical necessity — I did it deliberately to show I'm comfortable with both patterns and know when each fits: numbered pages suit data people jump around in, infinite loading suits a browsing/scanning experience, which felt like the better fit for locations specifically.


## Testing

Vitest + React Testing Library for units/hooks/components, Playwright for end-to-end flows.

```bash
npm test            # run once (59 unit/component tests)
npm run test:watch  # watch mode
npm run test:e2e    # Playwright — boots the dev server itself
```

**How the API is mocked.** No test touches the real API `also because the API has a rate-limit`, at either level:

- **Query layer (unit):** `fetch` is stubbed to return fixtures (`test/fixtures.ts`) that mirror the real GraphQL response shapes (`info { pages, next }`, result arrays). Tests assert both directions — what we *send* (e.g. `fetchCharacters` mapping `{ q, status, page }` filters into GraphQL variables) and how responses are *consumed*.
- **Browser layer (E2E):** Playwright's `page.route` intercepts `https://rickandmortyapi.com/graphql` before any request leaves the page and fulfills it with the same fixtures, keyed by operation name. `GetCharacters` also filters results by the requested `name` variable, so search behaves like the real API; `_next/image` gets a stub response.

**Testing a React Query hook (`useCharcters`).**

- Every test renders against a fresh `QueryClient` (`retry: false`) wrapped with `NuqsAdapter`; since nuqs reads filter state from the URL, tests seed it via `history.pushState`.
- Assertions track the hook's lifecycle: pending → success with fixture data, with the active filters reflected in the query key.
- The subtle behaviors are pinned down: SSR `initialData` applies **only while the URL filters still match the server-rendered ones** (change a filter → must refetch, not silently reuse page-1 SSR data), and the location sheet's cache-first lookup resolves from cached pages with zero network calls, falling back to a real fetch only on a cache miss.
- Component tests around the hooks cover the 400 ms debounced search writing `q` through nuqs, status filtering, pagination edges (page windowing, `aria-current`, disabled ends), and character episodes grouped into season tabs.

E2E specs walk the real flows against the running app with the network mocked: search filters the grid, pagination updates URL + active page, "Load more" appends locations, and the location sheet opens with residents and closes cleanly (URL param cleared).

## Extras beyond the brief

The task asked for a characters page `Dashboard`. I also built:

- A **home page** with a hero (animated Lottie character, one signature float animation), a character preview slider, and a media/samples section — mainly to show I can build a full page from scratch, not just the two required routes.
- **Location detail via a slide-over sheet** (backdrop-blur, cache-aware as above) instead of a separate route, since it felt like a better UX fit than a full page navigation for a quick "who lives here" glance.
- **Character detail pages** (`/characters/[id]`) with episode appearances grouped by season — the API only returns a flat "S01E01"-style string per episode, so I parse and group that client-side into season tabs.
- Small motion details (staggered reveals, scroll-triggered fades) kept deliberately restrained — one clear signature interaction per section rather than animating everything.

## Trade-offs, given time constraints

- The location cache lookup scans all cached pages linearly — fine at this data scale (single-digit page counts in practice), but I'd reach for a normalized entity cache (e.g. a flat `Map<id, Location>`) if this were a larger dataset.
