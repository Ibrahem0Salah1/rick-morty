// lib/types/index.ts
export type CharactersResult = {
  characters: {
    info: { count: number; pages: number; next: number | null; prev: number | null }
    results: Character[]
  }
}

export type Character = {
  id: string
  name: string
  status: string
  species: string
  image: string
  origin: { name: string }
}

//locations
export type Resident = { id: string; name: string; image: string }

export type Location = {
  id: string
  name: string
  type: string
  residents: Resident[]
}

export type LocationsResult = {
  locations: {
    info: { count: number; pages: number; next: number | null; prev: number | null }
    results: Location[]
  }
}

export type LocationResult = { location: Location }

export type CharacterDetail = {
  id: string
  name: string
  type: string
  image: string
  status: "Alive" | "Dead" | "unknown"
  episode: { id: string; name: string; episode: string }[]
  location : {id:string, name:string}
}
export type CharacterDetailResult = { character: CharacterDetail }