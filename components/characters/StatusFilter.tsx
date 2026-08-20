"use client"
import { useCharctersFilters } from "@/hooks/useFilters"
import { cn } from "@/lib/utils"

const STATUSES = [
  { value: "All", label: "All", dot: null },
  { value: "Alive", label: "Alive", dot: "bg-emerald-400" },
  { value: "Dead", label: "Dead", dot: "bg-red-500" },
  { value: "unknown", label: "Unknown", dot: "bg-zinc-400" },
] as const

export function StatusFilter() {
  const [{ status }, setFilters] = useCharctersFilters()

  return (
    <div
      role="radiogroup"
      aria-label="Filter by status"
      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/3 p-1 backdrop-blur-sm"
    >
      {STATUSES.map((s) => {
        const active = status === s.value
        return (
          <button
            key={s.value}
            role="radio"
            aria-checked={active}
            onClick={() => setFilters({ status: s.value as typeof status, page: 1 })}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-[#fbdf00] text-black"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {s.dot && (
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  s.dot,
                  active && "bg-black/70"
                )}
              />
            )}
            {s.label}
          </button>
        )
      })}
    </div>
  )
}