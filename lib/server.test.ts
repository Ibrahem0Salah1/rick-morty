import { afterEach, describe, expect, it, vi } from "vitest"
import { fetchGraphQL } from "./server"

const ENDPOINT = "https://rickandmortyapi.com/graphql"

const fetchMock = vi.fn()

vi.stubGlobal("fetch", fetchMock)

function jsonResponse(payload: unknown) {
  return {
    ok: true,
    status: 200,
    json: async () => payload,
  }
}

afterEach(() => {
  fetchMock.mockReset()
})

describe("fetchGraphQL", () => {
  it("POSTs the query and variables as JSON to the GraphQL endpoint", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ data: {} }))

    await fetchGraphQL("query Test { ping }", { a: 1 })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]

    expect(url).toBe(ENDPOINT)
    expect(init.method).toBe("POST")
    expect(init.headers).toEqual({ "Content-Type": "application/json" })
    expect(init.body).toBe(JSON.stringify({ query: "query Test { ping }", variables: { a: 1 } }))
  })

  it("sends undefined variables key when no variables are given", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ data: {} }))

    await fetchGraphQL("query Test { ping }")

    const [, init] = fetchMock.mock.calls[0]
    expect(JSON.parse(init.body)).toEqual({
      query: "query Test { ping }",
      variables: undefined,
    })
  })

  it("resolves with the data field on success", async () => {
    const data = { characters: { results: [] } }
    fetchMock.mockResolvedValue(jsonResponse({ data }))

    const result = await fetchGraphQL<{ characters: { results: string[] } }>("query")

    expect(result).toEqual(data)
  })

  it("throws the first GraphQL error message when errors are present", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({
        errors: [{ message: "Character not found" }, { message: "second error" }],
        data: null,
      }),
    )

    await expect(fetchGraphQL("query")).rejects.toThrow("Character not found")
  })
})
