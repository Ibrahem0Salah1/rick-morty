// components/locations/LocationsGridSkeleton.tsx
export function LocationsGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-5"
        >
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-2/3 rounded bg-white/10" />
            <div className="h-3 w-1/3 rounded bg-white/10" />
          </div>

          <div className="flex animate-pulse items-center">
            <div className="flex -space-x-2.5">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-8 w-8 rounded-full bg-white/10 ring-2 ring-black" />
              ))}
            </div>
            <div className="ml-2.5 h-3 w-12 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}