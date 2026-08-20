// components/landing/CharacterCard.tsx
import Image from "next/image"
import Link from "next/link"
import type { Character } from "@/lib/types"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<string, string> = {
  Alive: "bg-emerald-400/15 text-emerald-400 ring-emerald-400/30",
  Dead: "bg-red-500/15 text-red-400 ring-red-500/30",
  unknown: "bg-zinc-400/15 text-zinc-400 ring-zinc-400/30",
}

export function CharacterCard({
  character,
  priority = false,
}: {
  character: Character
  priority?: boolean
}) {
  const statusKey = character.status in STATUS_STYLES ? character.status : "unknown"

  return (
    <Link
      href={`/characters/${character.id}`}
      className="group relative block overflow-hidden rounded-xs  backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
    >
      {/* image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {/* bottom fade so the image seats into the card rather than hard-cutting */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/70 to-transparent" />
      </div>

      {/* content */}
      <div className="space-y-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={cn(
              "truncate font-display text-base font-semibold tracking-tight text-white transition-colors duration-200",
              "group-hover:text-[#fbdf00]"
            )}
          >
            <span className="bg-[linear-gradient(#fbdf00,#fbdf00)] bg-[length:0%_1px] bg-bottom-left bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
              {character.name}
            </span>
          </h3>

          <span
            className={cn(
              " rounded-sm text-center px-2 py-0.5 text-xs font-medium ",
              STATUS_STYLES[statusKey]
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full text-center", )} />
            {character.status}
          </span>
        </div>

        <p className="truncate text-sm text-zinc-500">
          {character.origin?.name ?? "Unknown origin"}
        </p>
      </div>
    </Link>
  )
}