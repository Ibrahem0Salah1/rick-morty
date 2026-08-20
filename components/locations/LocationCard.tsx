// components/locations/LocationCard.tsx
"use client"
import Image from "next/image"
import type { Location } from "@/lib/types/index"
import { useLocationsFilters } from "@/hooks/useFilters"

export function LocationCard({ location }: { location: Location }) {
  const [, setFilters] = useLocationsFilters()
  const preview = location.residents.slice(0, 4)
  const extra = location.residents.length - preview.length

  return (
    <button
      onClick={() => setFilters({ location: Number(location.id) })}
      className="group flex w-full cursor-pointer flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 text-left backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
    >
      <div>
        <h3 className="font-display text-base font-semibold text-white transition-colors duration-200 group-hover:text-[#fbdf00]">
          {location.name}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">{location.type}</p>
      </div>

      {preview.length > 0 && (
        <div className="flex items-center">
          <div className="flex -space-x-2.5">
            {preview.map((r) => (
              <div
                key={r.id}
                className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-black"
              >
                <Image src={r.image} alt={r.name} fill sizes="32px" className="object-cover" />
              </div>
            ))}
          </div>
          {extra > 0 && (
            <span className="ml-2.5 text-xs font-medium text-zinc-500">+{extra} more</span>
          )}
        </div>
      )}
    </button>
  )
}