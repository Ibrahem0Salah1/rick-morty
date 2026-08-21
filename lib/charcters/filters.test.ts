import { describe, expect, it } from "vitest"
import { searchParamsCache } from "./filters"

describe("characters searchParamsCache", () => {
  it("returns defaults when no params are present", () => {
    expect(searchParamsCache.parse({})).toEqual({ q: "", page: 1, status: "All" })
  })

  it("coerces page to a number", () => {
    expect(searchParamsCache.parse({ page: "3" }).page).toBe(3)
  })

  it("falls back to the default page for invalid values", () => {
    expect(searchParamsCache.parse({ page: "abc" }).page).toBe(1)
  })

  it("passes q through unchanged", () => {
    expect(searchParamsCache.parse({ q: "rick sanchez" }).q).toBe("rick sanchez")
  })

  it("parses a valid status value", () => {
    expect(searchParamsCache.parse({ status: "Dead" }).status).toBe("Dead")
    expect(searchParamsCache.parse({ status: "unknown" }).status).toBe("unknown")
  })

  it("falls back to 'All' for an invalid status value", () => {
    expect(searchParamsCache.parse({ status: "Zombie" }).status).toBe("All")
  })

  it("parses a full filter set at once", () => {
    const parsed = searchParamsCache.parse({ q: "morty", page: "5", status: "Alive" })

    expect(parsed).toEqual({ q: "morty", page: 5, status: "Alive" })
  })
})
