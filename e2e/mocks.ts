import type { Page } from "@playwright/test"
import type { LocationResult } from "../lib/types"
import {
  characterDetailResult,
  charactersResult,
  earthLocation,
  locationsPageOne,
  mortyCharacter,
  rickCharacter,
} from "../test/fixtures"

export const locationDetailResult: LocationResult = {
  location: {
    ...earthLocation,
    residents: [
      { id: rickCharacter.id, name: rickCharacter.name, image: rickCharacter.image },
      { id: mortyCharacter.id, name: mortyCharacter.name, image: mortyCharacter.image },
    ],
  },
}

type GraphQLRequestBody = {
  operationName?: string | null
  query?: string
  variables?: Record<string, unknown>
}

const NAMED_OPERATION = /\bquery\s+([A-Za-z0-9_]+)/

function resolveOperationName(body: GraphQLRequestBody): string | null {
  if (body.operationName) return body.operationName
  const match = typeof body.query === "string" ? NAMED_OPERATION.exec(body.query) : null
  return match ? match[1] : null
}

export async function installGraphQLMocks(page: Page) {
  await page.route("**/_next/image*", (route) =>
    route.fulfill({ status: 200, contentType: "image/svg+xml", body: "" }),
  )

  await page.route("https://rickandmortyapi.com/graphql", async (route) => {
    const body = route.request().postDataJSON() as GraphQLRequestBody
    const operationName = resolveOperationName(body)
    let data: unknown

    switch (operationName) {
      case "GetLocations":
        data = locationsPageOne
        break
      case "GetLocation":
        data = locationDetailResult
        break
      case "GetCharacter":
        data = characterDetailResult
        break
      case "GetCharacters": {
        const name =
          typeof body.variables?.name === "string" ? body.variables.name.toLowerCase() : ""
        const results = charactersResult.characters.results.filter((character) =>
          name === "" ? true : character.name.toLowerCase().includes(name),
        )
        data = { characters: { ...charactersResult.characters, results } }
        break
      }
      default:
        data = charactersResult
    }

    await route.fulfill({ json: { data } })
  })
}
