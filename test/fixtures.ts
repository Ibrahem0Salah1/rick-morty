import type {
  Character,
  CharacterDetailResult,
  CharactersResult,
  Location,
  LocationsResult,
} from "@/lib/types"

export const info = { count: 826, pages: 42, next: 2, prev: null }

export const rickCharacter: Character = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  origin: { name: "Earth (C-137)" },
}

export const mortyCharacter: Character = {
  id: "2",
  name: "Morty Smith",
  status: "unknown",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  origin: { name: "unknown" },
}

export const charactersResult: CharactersResult = {
  characters: { info, results: [rickCharacter, mortyCharacter] },
}

export const earthLocation: Location = {
  id: "1",
  name: "Earth (Replacement Dimension)",
  type: "Planet",
  residents: [{ id: "1", name: "Rick Sanchez", image: rickCharacter.image }],
}

export const locationsPageOne: LocationsResult = {
  locations: { info, results: [earthLocation] },
}

export const citadelLocation: Location = {
  id: "3",
  name: "Citadel of Ricks",
  type: "Space station",
  residents: [],
}

export const characterDetailResult: CharacterDetailResult = {
  character: {
    id: "1",
    name: "Rick Sanchez",
    type: "",
    image: rickCharacter.image,
    status: "Alive",
    episode: [
      { id: "1", name: "Pilot", episode: "S01E01" },
      { id: "12", name: "Close Rick-counters of the Rick Kind", episode: "S01E10" },
      { id: "21", name: "Get Schwifty", episode: "S02E05" },
    ],
    location: { id: "1", name: "Earth (Replacement Dimension)" },
  },
}
