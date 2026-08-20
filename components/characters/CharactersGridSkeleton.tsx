import { SearchInput } from "./SearchInput";

// components/characters/CharactersGridSkeleton.tsx
export function CharactersGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
    
    <div className="grid mx-auto max-w-7xl px-4  py-22 mt-16 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-white/10 bg-black/40">
          <div className="aspect-square w-full animate-pulse bg-white/10" />
          <div className="animate-pulse space-y-2 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 w-2/3 rounded bg-white/10" />
              <div className="h-5 w-14 shrink-0 rounded-full bg-white/10" />
            </div>
            <div className="h-3 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
    </>
  )
}