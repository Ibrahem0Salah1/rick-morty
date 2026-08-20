// components/locations/LocationSheet.tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useLocationsFilters } from "@/hooks/useFilters"
import { useLocation } from "@/hooks/useLocation"
import { useLocationFromCache } from "./useLocationFromCache"
import Link from "next/link"
// components/locations/LocationSheet.tsx — swap the data source
export function LocationSheet() {
  const [{ location: locationId }, setFilters] = useLocationsFilters()
  const isOpen = locationId !== null && locationId !== undefined

  const cached = useLocationFromCache(locationId)
  const { data, isLoading } = useLocation(locationId, { enabled: !cached })
  const location = cached ?? data?.location
  console.log(cached);
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setFilters({ location: null })
      }}
    >
     <SheetContent
  side="right"
  className="min-w-full sm:min-w-[50%] bg-black/90 p-0 backdrop-blur-xl [&>button]:hidden"
>
  <div className="relative flex h-full flex-col overflow-y-auto px-6 py-8">
    {/* now a grandchild of SheetContent, not a direct child —
        the [&>button]:hidden selector no longer touches it */}
    <button
      onClick={() => setFilters({ location: null })}
      aria-label="Close"
      className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
    >
      <CloseIcon />
    </button>

    {isLoading || !location ? (
      <SheetSkeleton />
          ) : (
            <>
              {/* header */}
              <div className="pr-10">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#fbdf00]">
                  {location.type}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-white">
                  {location.name}
                </h2>
              </div>

              <div className="my-6 h-px bg-white/10" />

              {/* residents */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-300">Residents</h3>
                <span className="text-xs text-zinc-500">{location.residents.length}</span>
              </div>

              {location.residents.length === 0 ? (
                <p className="mt-4 text-sm text-zinc-500">No known residents.</p>
              ) : (
                <div className="mt-4 flex flex-col gap-1">
                    
                  {location.residents.map((r, i) => (
                    
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.03, ease: "easeOut" }}
                      className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5"
                    >
                    <Link href={`/characters/${r.id}`} className="flex  items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                            <Image src={r.image} alt={r.name} fill sizes="46px" className="object-cover" />
                        </div>
                        <span className="truncate  text-sm md:text-base text-zinc-200">{r.name}</span>
                    </Link>
                    </motion.div>
                    
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SheetSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2 pr-10">
        <div className="h-3 w-20 rounded bg-white/10" />
        <div className="h-7 w-48 rounded bg-white/10" />
      </div>
      <div className="h-px bg-white/10" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/10" />
            <div className="h-3.5 w-32 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}