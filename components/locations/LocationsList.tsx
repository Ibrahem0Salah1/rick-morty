// app/locations/locations-view.tsx
"use client"
import { useInfiniteLocations } from "@/hooks/useLocations"
import { LocationCard } from "@/components/locations/LocationCard"
import { LocationSheet } from "@/components/locations/LocationSheet"
import { LocationsGridSkeleton } from "./LocationsGridSkeleton"


export function LocationsView() {
   const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteLocations()
    console.log(data);
    const locations = data?.pages.flatMap((page) => page.locations.results) ?? []
   if (isLoading) return <LocationsGridSkeleton/>

  return (
    <div className="mx-auto px-4  sm:px-16 py-14">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </button>
        </div>
      )}

      <LocationSheet />
    </div>
  )
}