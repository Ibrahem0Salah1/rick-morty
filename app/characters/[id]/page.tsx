// app/characters/[id]/page.tsx
import Image from "next/image"
import classNames from "classnames"
import { fetchCharacter } from "@/lib/charcters/queries"
import { CharacterEpisodes } from "@/components/characters/CharacterEpisodes"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { character } = await fetchCharacter(Number(id))

  const statusBadge = classNames(
    "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1",
    {
      "bg-emerald-400/15 text-emerald-400 ring-emerald-400/30": character.status === "Alive",
      "bg-red-500/15 text-red-400 ring-red-500/30": character.status === "Dead",
      "bg-zinc-400/15 text-zinc-400 ring-zinc-400/30": character.status === "unknown",
    }
  )

  return (
    <div className="mx-auto  px-18 py-30">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <div className="relative h-65 w-65 shrink-0 overflow-hidden rounded-lg border border-white/10">
          <Image src={character.image} alt={character.name} fill sizes="224px" className="object-cover" priority />
        </div>

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <span className={statusBadge}>{character.status}</span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
            {character.name}
          </h1>
          {character.type && <p className="mt-1 text-sm text-zinc-500">{character.type}</p>}
          
          <Link href={`/locations?location=${character.location.id}`}>
                <p
                className={cn(
                    "truncate font-display text-[#fbdf00] text-base font-semibold tracking-tight underline transition-colors duration-200",
                    "hover:text-[#fbdf00]"
                )}>
                    <span className="bg-[linear-gradient(#fbdf00,#fbdf00)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out hover:bg-size-[100%_1px]">
                        {character.location.name}
                    </span>
                </p>
          </Link>
        </div>
      </div>

      <div className="my-8 h-px bg-white/10" />

      <h2 className="mb-6 font-display text-lg font-semibold text-white">
        Appearances
        <span className="ml-2 text-sm font-normal text-zinc-500">
          {character.episode.length} episodes
        </span>
      </h2>

      <CharacterEpisodes episodes={character.episode} />
    </div>
  )
}