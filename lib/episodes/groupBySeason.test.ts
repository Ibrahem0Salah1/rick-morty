import { describe, expect, it } from "vitest"
import { groupEpisodesBySeason } from "./groupBySeason"

const ep = (id: string, name: string, episode: string) => ({ id, name, episode })

describe("groupEpisodesBySeason", () => {
  it("returns an empty array for empty input", () => {
    expect(groupEpisodesBySeason([])).toEqual([])
  })

  it("groups episodes by season", () => {
    const result = groupEpisodesBySeason([
      ep("1", "Pilot", "S01E01"),
      ep("2", "Lawnmower Dog", "S01E02"),
      ep("3", "A Rickle in Time", "S02E01"),
    ])

    expect(result).toHaveLength(2)
    expect(result[0].season).toBe(1)
    expect(result[0].episodes).toHaveLength(2)
    expect(result[1].season).toBe(2)
    expect(result[1].episodes).toHaveLength(1)
  })

  it("sorts seasons ascending regardless of input order", () => {
    const result = groupEpisodesBySeason([
      ep("3", "A Rickle in Time", "S02E01"),
      ep("1", "Pilot", "S01E01"),
      ep("12", "Con-victed", "S08E05"),
    ])

    expect(result.map((s) => s.season)).toEqual([1, 2, 8])
  })

  it("sorts episodes within a season by episode number", () => {
    const result = groupEpisodesBySeason([
      ep("2", "Lawnmower Dog", "S01E02"),
      ep("6", "Meeseeks and Destroy", "S01E05"),
      ep("1", "Pilot", "S01E01"),
    ])

    expect(result[0].episodes.map((e) => e.episode)).toEqual(["S01E01", "S01E02", "S01E05"])
    expect(result[0].episodes.map((e) => e.epNumber)).toEqual([1, 2, 5])
  })

  it("adds epNumber and preserves original fields on grouped episodes", () => {
    const result = groupEpisodesBySeason([ep("1", "Pilot", "S01E01")])

    expect(result[0].episodes[0]).toEqual({
      id: "1",
      name: "Pilot",
      episode: "S01E01",
      epNumber: 1,
    })
  })

  it("skips episodes with malformed codes", () => {
    const result = groupEpisodesBySeason([
      ep("1", "Pilot", "S01E01"),
      ep("99", "Mystery Episode", "SXXEXX"),
      ep("98", "No code at all", ""),
    ])

    expect(result).toHaveLength(1)
    expect(result[0].season).toBe(1)
    expect(result[0].episodes).toHaveLength(1)
  })

  it("handles multi-digit seasons and episode numbers", () => {
    const result = groupEpisodesBySeason([ep("30", "Deep Season", "S10E12")])

    expect(result[0].season).toBe(10)
    expect(result[0].episodes[0].epNumber).toBe(12)
  })
})
