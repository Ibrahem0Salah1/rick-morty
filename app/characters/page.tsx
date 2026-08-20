import { CharactersView } from "@/components/characters/CharactersList"
import { searchParamsCache } from "@/lib/charcters/filters"
import { fetchCharacters } from "@/lib/charcters/queries"

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
  }).catch(() => undefined) 
  return (
        <CharactersView initialData={initialData} /> 
    )   
}