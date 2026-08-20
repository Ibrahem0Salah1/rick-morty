// lib/graphql.ts
const ENDPOINT = "https://rickandmortyapi.com/graphql";

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // Next.js caching control (App Router):
    next: { revalidate: 3600 }, // ISR-style caching,
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}