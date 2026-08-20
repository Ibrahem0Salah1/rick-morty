// lib/locations/queries.ts
import { fetchGraphQL } from "../server"
import type { LocationsResult, LocationResult } from "@/lib/types/index"

export const LOCATIONS_QUERY =  `
  query GetLocations($page: Int) {
    locations(page: $page) {
      info { count pages next prev }
      results {
        id
        name
        type
        residents { id name image }
      }
    }
  }
`

export const LOCATION_QUERY = `
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      residents { id name image }
    }
  }
`

export function fetchLocations(variables: { page: number }) {
  return fetchGraphQL<LocationsResult>(LOCATIONS_QUERY, variables)
}

export function fetchLocation(id: number) {
  return fetchGraphQL<LocationResult>(LOCATION_QUERY, { id })
}