"use client"
import { useQuery } from "@tanstack/react-query"
import { fetchLocation } from "@/lib/locations/queries"
//  only fetches when the cache genuinely misses
export function useLocation(id: number | null | undefined, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["location", id],
    queryFn: () => fetchLocation(id as number),
    enabled: (id !== null && id !== undefined) && (options?.enabled ?? true),
    staleTime: 60_000,
  })
}