import { describe, expect, it } from "vitest"
import { locationsSearchParamsCache } from "./filters"

describe("locations searchParamsCache", () => {
  it("returns default page and no location when no params are present", () => {
    const parsed = locationsSearchParamsCache.parse({})

    expect(parsed.page).toBe(1)
    expect(parsed.location).toBeNull()
  })

  it("coerces page to a number", () => {
    expect(locationsSearchParamsCache.parse({ page: "4" }).page).toBe(4)
  })

  it("falls back to the default page for invalid values", () => {
    expect(locationsSearchParamsCache.parse({ page: "nope" }).page).toBe(1)
  })

  it("parses the location param as a number", () => {
    expect(locationsSearchParamsCache.parse({ location: "7" }).location).toBe(7)
  })
})
