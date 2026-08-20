"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { groupEpisodesBySeason } from "@/lib/episodes/groupBySeason"

export function CharacterEpisodes({ episodes }: { episodes: { id: string; name: string; episode: string }[] }) {
  const seasons = groupEpisodesBySeason(episodes)
  if (seasons.length === 0) return null

  return (
    <Tabs defaultValue={String(seasons[0].season)}>
      <TabsList className="h-auto flex-wrap gap-1.5 bg-transparent p-0">
        {seasons.map(({ season, episodes }) => (
          <TabsTrigger
            key={season}
            value={String(season)}
            className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-zinc-400 data-[state=active]:border-transparent data-[state=active]:bg-[#fbdf00] data-[state=active]:text-black"
          >
            Season {season}
            <span className=" text-xs opacity-60">{episodes.length}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {seasons.map(({ season, episodes }) => (
        <TabsContent key={season} value={String(season)} className="mt-6">
          <div className="flex flex-col gap-1.5 mt-10 md:mt-4">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-3 transition-colors hover:bg-white/4"
              >
                <span className="font-display text-xs font-semibold text-[#fbdf00]">
                  {ep.episode}
                </span>
                <span className="text-sm text-zinc-300">{ep.name}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}