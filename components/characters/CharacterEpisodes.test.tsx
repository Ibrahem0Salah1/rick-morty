import { fireEvent } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { characterDetailResult } from "@/test/fixtures"
import { renderWithProviders } from "@/test/test-utils"
import { CharacterEpisodes } from "./CharacterEpisodes"

const episodes = characterDetailResult.character.episode

describe("CharacterEpisodes", () => {
  it("renders one tab per season", () => {
    const { getByRole } = renderWithProviders(<CharacterEpisodes episodes={episodes} />)

    expect(getByRole("tab", { name: /Season 1/ })).toBeInTheDocument()
    expect(getByRole("tab", { name: /Season 2/ })).toBeInTheDocument()
  })

  it("shows the first season by default with its episodes", () => {
    const { getByText, queryByText } = renderWithProviders(
      <CharacterEpisodes episodes={episodes} />,
    )

    expect(getByText("Pilot")).toBeVisible()
    expect(getByText("Close Rick-counters of the Rick Kind")).toBeVisible()
    const schwifty = queryByText("Get Schwifty")
    if (schwifty) {
      expect(schwifty).not.toBeVisible()
    } else {
      expect(schwifty).toBeNull()
    }
  })

  it("switches seasons when clicking a tab", () => {
    const { getByRole, getByText, queryByText } = renderWithProviders(
      <CharacterEpisodes episodes={episodes} />,
    )

    fireEvent.click(getByRole("tab", { name: /Season 2/ }))

    expect(getByText("Get Schwifty")).toBeVisible()
    const pilot = queryByText("Pilot")
    if (pilot) {
      expect(pilot).not.toBeVisible()
    } else {
      expect(pilot).toBeNull()
    }
  })

  it("renders nothing when there are no episodes", () => {
    const { container } = renderWithProviders(<CharacterEpisodes episodes={[]} />)

    expect(container).toBeEmptyDOMElement()
  })
})
