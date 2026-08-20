// hooks/useCharacters.ts
"use client"
import { useState } from "react"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useCharctersFilters } from "./useFilters"
import { fetchCharacters, type CharactersVariables } from "@/lib/charcters/queries"
import { CharactersResult } from "@/lib/types"

export function useCharacters(initialData?: CharactersResult) {
  const [filters] = useCharctersFilters()

  // Capture the filters that were active on mount (== the ones used for SSR).
  const [ssrFilters] = useState(filters)

  const vars: CharactersVariables = {
    page: filters.page,
    name: filters.q,
    status: filters.status,
  }

  const isInitialFilters =
    filters.page === ssrFilters.page &&
    filters.q === ssrFilters.q &&
    filters.status === ssrFilters.status

  return useQuery({
    queryKey: ["characters", vars],
    queryFn: () => fetchCharacters(vars),
    placeholderData: keepPreviousData, 
    initialData: isInitialFilters ? initialData : undefined,
  })
}