import { waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { CharactersResult } from "@/lib/types"
import { charactersResult } from "@/test/fixtures"
import { renderHookWithProviders } from "@/test/test-utils"
import { useCharacters } from "./useCharcters"

const { fetchCharactersMock } = vi.hoisted(() => ({
  fetchCharactersMock: vi.fn(),
}))

vi.mock("@/lib/charcters/queries", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/charcters/queries")>()
  return {
    ...original,
    fetchCharacters: (...args: Parameters<typeof original.fetchCharacters>) =>
      fetchCharactersMock(...args),
  }
})

describe("useCharacters", () => {
  it("uses initialData without refetching while filters are unchanged", () => {
    fetchCharactersMock.mockResolvedValue(charactersResult)

    const { result } = renderHookWithProviders(() => useCharacters(charactersResult), {
      url: "/characters",
    })

    expect(result.current.data).toEqual(charactersResult)
    expect(fetchCharactersMock).not.toHaveBeenCalled()
  })

  it("derives query variables from the current URL and fetches", async () => {
    fetchCharactersMock.mockResolvedValue(charactersResult)

    const { result } = renderHookWithProviders(() => useCharacters(undefined), {
      url: "/characters?page=3&q=morty&status=Dead",
    })

    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })

    expect(fetchCharactersMock).toHaveBeenCalledWith({
      page: 3,
      name: "morty",
      status: "Dead",
    })
  })

  it("fetches with defaults when the URL has no filter params", async () => {
    const emptyResult: CharactersResult = {
      characters: {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      },
    }
    fetchCharactersMock.mockResolvedValue(emptyResult)

    const { result } = renderHookWithProviders(() => useCharacters(undefined), {
      url: "/characters",
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(emptyResult)
    })

    expect(fetchCharactersMock).toHaveBeenCalledWith({ page: 1, name: "", status: "All" })
  })
})
