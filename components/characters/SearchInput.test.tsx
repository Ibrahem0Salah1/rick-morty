import { fireEvent, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { renderWithProviders } from "@/test/test-utils"
import { SearchInput } from "./SearchInput"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe("SearchInput", () => {
  it("does not update the URL before the debounce elapses", async () => {
    const { getByPlaceholderText } = renderWithProviders(<SearchInput />, {
      url: "/characters",
    })

    fireEvent.change(getByPlaceholderText("Search Characters..."), {
      target: { value: "rick" },
    })
    await wait(150)

    expect(window.location.search).toBe("")
  })

  it("updates the URL with q and resets the page after the debounce", async () => {
    const { getByPlaceholderText } = renderWithProviders(<SearchInput />, {
      url: "/characters?page=4",
    })

    fireEvent.change(getByPlaceholderText("Search Characters..."), {
      target: { value: "rick" },
    })

    await waitFor(() => {
      expect(window.location.search).toBe("?q=rick")
    })
  })

  it("resets the debounce timer so only the last keystroke reaches the URL", async () => {
    const urlWrites: string[] = []
    const recordWrite = (_state: unknown, _unused: string, url: string | URL | null) => {
      urlWrites.push(new URL(String(url ?? window.location.href), window.location.href).search)
    }
    const pushSpy = vi.spyOn(window.history, "pushState").mockImplementation(recordWrite as typeof window.history.pushState)
    const replaceSpy = vi.spyOn(window.history, "replaceState").mockImplementation(recordWrite as typeof window.history.replaceState)

    try {
      const { getByPlaceholderText } = renderWithProviders(<SearchInput />, {
        url: "/characters",
      })
      const input = getByPlaceholderText("Search Characters...")

      fireEvent.change(input, { target: { value: "ri" } })
      await wait(300)
      fireEvent.change(input, { target: { value: "rick" } })

      await waitFor(() => {
        expect(window.location.search).toBe("?q=rick")
      })

      const qValues = urlWrites.map((search) => new URLSearchParams(search).get("q")).filter(Boolean)
      expect(qValues).toEqual(["rick"])
    } finally {
      pushSpy.mockRestore()
      replaceSpy.mockRestore()
    }
  })

  it("shows a clear button for an active query that empties the URL", async () => {
    const { getByRole, getByPlaceholderText } = renderWithProviders(<SearchInput />, {
      url: "/characters?q=morty",
    })

    fireEvent.click(getByRole("button", { name: "Clear search" }))

    await waitFor(() => {
      expect(window.location.search).toBe("")
    })
    expect(getByPlaceholderText("Search Characters...")).toHaveValue("")
  })

  it("hides the clear button when the query is empty", () => {
    const { queryByRole } = renderWithProviders(<SearchInput />, { url: "/characters" })

    expect(queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument()
  })
})
