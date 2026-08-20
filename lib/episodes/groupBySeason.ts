type Episode = { id: string; name: string; episode: string } // "S01E01"

export function groupEpisodesBySeason(episodes: Episode[]) {
  const bySeason = new Map<number, (Episode & { epNumber: number })[]>()

  for (const ep of episodes) {
    const match = ep.episode.match(/S(\d+)E(\d+)/)
    if (!match) continue

    const season = Number(match[1])
    const epNumber = Number(match[2])

    if (!bySeason.has(season)) bySeason.set(season, [])
    bySeason.get(season)!.push({ ...ep, epNumber })
  }

  return Array.from(bySeason.entries())
    .sort(([a], [b]) => a - b) // season 1, 2, 3...
    .map(([season, eps]) => ({
      season,
      episodes: eps.sort((a, b) => a.epNumber - b.epNumber)
    }))
}