// app/characters/page.tsx
import { CharactersGridSkeleton } from "@/components/characters/CharactersGridSkeleton"
import { CharactersView } from "@/components/characters/CharactersList"
import { SearchInput } from "@/components/characters/SearchInput"
import { searchParamsCache } from "@/lib/charcters/filters"
import { fetchCharacters } from "@/lib/charcters/queries"
import { Suspense } from "react"
// import { CharactersView } from "./characters-view"

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const filters = searchParamsCache.parse(await searchParams) // { q, page, status}

  const initialData = await fetchCharacters({
    page: filters.page,
    name: filters.q,
    status: filters.status,
  }).catch(() => undefined) // API returns errors when no match — don't crash SSR
  console.log(initialData?.characters.results);
  return (
        <CharactersView initialData={initialData} /> 
  )   
}