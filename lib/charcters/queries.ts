import { fetchGraphQL } from "../server";
import type { CharactersResult } from "../types";
import {CharacterDetailResult} from "../types"
export const CHARACTERS_QUERY = /* GraphQL */ `
  query GetCharacters($page: Int, $name: String, $status: String) {
    characters(page: $page, filter: { name: $name, status: $status}) {
      info { count pages next prev }
      results { id name status species image origin { name } }
      
    }
  }
`
export type CharactersVariables = {
    page : number,
    name : string,
    status : string
}

export function fetchCharacters(variables : CharactersVariables) {
    return fetchGraphQL<CharactersResult>(CHARACTERS_QUERY, {
        page : variables.page,
        name : variables.name || null,
        status: variables.status === "All" ? null : variables.status
    })
}


//Single Character

export const CHARACTER_QUERY = /* GraphQL */ `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      type
      image
      status
      episode { id name episode }
      location {id name}
    }
  }
`
export function fetchCharacter(id: number) {
  return fetchGraphQL<CharacterDetailResult>(CHARACTER_QUERY, { id })
}