import { describe, expect, it } from "vitest"
import type { Character } from "@/lib/types"
import { mortyCharacter, rickCharacter } from "@/test/fixtures"
import { renderWithProviders } from "@/test/test-utils"
import { CharacterCard } from "./CharacterCard"

describe("CharacterCard", () => {
  it("links to the character detail page", () => {
    const { getByRole } = renderWithProviders(<CharacterCard character={rickCharacter} />)

    expect(getByRole("link")).toHaveAttribute("href", "/characters/1")
  })

  it("shows name, status and origin", () => {
    const { getByText } = renderWithProviders(<CharacterCard character={rickCharacter} />)

    expect(getByText("Rick Sanchez")).toBeInTheDocument()
    expect(getByText("Alive")).toBeInTheDocument()
    expect(getByText("Earth (C-137)")).toBeInTheDocument()
  })

  it("applies green styling for Alive characters", () => {
    const { getByText } = renderWithProviders(<CharacterCard character={rickCharacter} />)

    expect(getByText("Alive").className).toContain("text-emerald-400")
  })

  it("applies red styling for Dead characters", () => {
    const dead: Character = { ...mortyCharacter, id: "3", name: "Birdperson", status: "Dead" }
    const { getByText } = renderWithProviders(<CharacterCard character={dead} />)

    expect(getByText("Dead").className).toContain("text-red-400")
  })

  it("falls back to unknown styling for unexpected status values", () => {
    const weird: Character = { ...rickCharacter, status: "Cronenberg" as Character["status"] }
    const { getByText } = renderWithProviders(<CharacterCard character={weird} />)

    expect(getByText("Cronenberg").className).toContain("text-zinc-400")
  })

  it("shows 'Unknown origin' when origin is missing", () => {
    const noOrigin = { ...mortyCharacter, origin: undefined } as unknown as Character
    const { getByText } = renderWithProviders(<CharacterCard character={noOrigin} />)

    expect(getByText("Unknown origin")).toBeInTheDocument()
  })
})
