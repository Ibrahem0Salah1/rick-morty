import { afterEach, describe, expect, it, vi } from "vitest"
import { CHARACTER_QUERY, CHARACTERS_QUERY, fetchCharacter, fetchCharacters } from "./queries"

const { fetchGraphQLMock } = vi.hoisted(() => ({
  fetchGraphQLMock: vi.fn(),
}))

vi.mock("../server", () => ({
  fetchGraphQL: fetchGraphQLMock,
}))

afterEach(() => {
  fetchGraphQLMock.mockReset()
})

describe("fetchCharacters", () => {
  it("maps empty name and 'All' status to null filter values", () => {
    fetchCharacters({ page: 2, name: "", status: "All" })

    expect(fetchGraphQLMock).toHaveBeenCalledTimes(1)
    expect(fetchGraphQLMock).toHaveBeenCalledWith(CHARACTERS_QUERY, {
      page: 2,
      name: null,
      status: null,
    })
  })

  it("passes real name and status filters through", () => {
    fetchCharacters({ page: 1, name: "rick", status: "Dead" })

    expect(fetchGraphQLMock).toHaveBeenCalledWith(CHARACTERS_QUERY, {
      page: 1,
      name: "rick",
      status: "Dead",
    })
  })
})

describe("fetchCharacter", () => {
  it("requests the character query with the given id", () => {
    fetchCharacter(42)

    expect(fetchGraphQLMock).toHaveBeenCalledWith(CHARACTER_QUERY, { id: 42 })
  })
})
