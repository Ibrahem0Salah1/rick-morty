// hooks/useLocationFromCache.ts
"use client"
import { useQueryClient } from "@tanstack/react-query"
import type { LocationsResult, Location } from "@/lib/types/index"

export function useLocationFromCache(id: number | null | undefined): Location | undefined {
  const queryClient = useQueryClient()
  if (id == null) return undefined

  // source of location list data in the cache
  const cachedPages = queryClient.getQueriesData<{ pages: LocationsResult[] }>({
    queryKey: ["locations", "infinite"],
  })

  for (const [, data] of cachedPages) {
    if (!data?.pages) continue // still loading / no data yet for this entry

    for (const page of data.pages) {
      const match = page.locations?.results.find((loc) => Number(loc.id) === id)
      if (match) return match
    }
  }

  return undefined
}