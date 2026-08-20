"use client"
import { useCharacters } from "@/hooks/useCharcters"
import { CharacterCard } from "@/components/characters/CharacterCard"
import { SearchInput } from "@/components/characters/SearchInput"
import { StatusFilter } from "@/components/characters/StatusFilter"
import type { CharactersResult } from "@/lib/types"
import { Pagination } from "../shared/Pagination"
import { cn } from "@/lib/utils"
import { CharactersGridSkeleton } from "./CharactersGridSkeleton"
export function CharactersView({ initialData }: { initialData?: CharactersResult }) {
  const { data, isPlaceholderData, isRefetching } = useCharacters(initialData)
  if(isRefetching) return <CharactersGridSkeleton/>
  return (
    <div className="mx-auto max-w-7xl px-4  py-22">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput />
        <StatusFilter />
      </div>
      
      {!data || data.characters.results.length === 0 ? (
        <p className="py-20 text-center text-zinc-500">No characters found.</p>
      ) : (
        <>
          <div
            className={cn(
              "grid grid-cols-2 gap-6 transition-opacity duration-200 sm:grid-cols-3 lg:grid-cols-4",
              isPlaceholderData && "opacity-50"
            )}
          >
            {data.characters.results.map((c, i) => (
              <CharacterCard key={c.id} character={c} priority={i < 4} />
            ))}
          </div>
          <div className="mt-10">
            <Pagination totalPages={data.characters.info.pages} />
          </div>
        </>
      )}
    </div>
  )
}