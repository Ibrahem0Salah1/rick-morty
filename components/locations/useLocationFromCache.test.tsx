import { describe, expect, it } from "vitest"
import type { LocationsResult } from "@/lib/types"
import { citadelLocation, earthLocation, locationsPageOne } from "@/test/fixtures"
import { createTestQueryClient, renderHookWithProviders } from "@/test/test-utils"
import { useLocationFromCache } from "./useLocationFromCache"

function seedLocationsCache(queryClient: ReturnType<typeof createTestQueryClient>) {
  const data = {
    pages: [
      locationsPageOne,
      { locations: { info: locationsPageOne.locations.info, results: [citadelLocation] } },
    ] satisfies LocationsResult[],
    pageParams: [1, 2],
  }
  queryClient.setQueryData(["locations", "infinite"], data)
}

describe("useLocationFromCache", () => {
  it("returns the matching location from a cached page", () => {
    const queryClient = createTestQueryClient()
    seedLocationsCache(queryClient)

    const { result } = renderHookWithProviders(
      () => useLocationFromCache(Number(citadelLocation.id)),
      { queryClient },
    )

    expect(result.current?.id).toBe("3")
    expect(result.current?.name).toBe("Citadel of Ricks")
  })

  it("returns undefined when no cached page contains the id", () => {
    const queryClient = createTestQueryClient()
    seedLocationsCache(queryClient)

    const { result } = renderHookWithProviders(() => useLocationFromCache(999), { queryClient })

    expect(result.current).toBeUndefined()
  })

  it("returns undefined when id is null", () => {
    const queryClient = createTestQueryClient()
    seedLocationsCache(queryClient)

    const { result } = renderHookWithProviders(() => useLocationFromCache(null), { queryClient })

    expect(result.current).toBeUndefined()
  })

  it("returns undefined when the cache is empty (still loading)", () => {
    const queryClient = createTestQueryClient()

    const { result } = renderHookWithProviders(
      () => useLocationFromCache(Number(earthLocation.id)),
      { queryClient },
    )

    expect(result.current).toBeUndefined()
  })
})
