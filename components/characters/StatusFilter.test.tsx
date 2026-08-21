import { fireEvent, waitFor, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { renderWithProviders } from "@/test/test-utils"
import { StatusFilter } from "./StatusFilter"

describe("StatusFilter", () => {
  it("renders a labelled radiogroup with the four status options", () => {
    const { getByRole } = renderWithProviders(<StatusFilter />, { url: "/characters" })

    const group = getByRole("radiogroup", { name: "Filter by status" })
    const radios = within(group).getAllByRole("radio")

    expect(radios).toHaveLength(4)
    expect(within(group).getByRole("radio", { name: "All" })).toBeInTheDocument()
    expect(within(group).getByRole("radio", { name: "Alive" })).toBeInTheDocument()
    expect(within(group).getByRole("radio", { name: "Dead" })).toBeInTheDocument()
    expect(within(group).getByRole("radio", { name: "Unknown" })).toBeInTheDocument()
  })

  it("marks 'All' as checked by default", () => {
    const { getByRole } = renderWithProviders(<StatusFilter />, { url: "/characters" })

    expect(getByRole("radio", { name: "All" }).getAttribute("aria-checked")).toBe("true")
    expect(getByRole("radio", { name: "Alive" }).getAttribute("aria-checked")).toBe("false")
  })

  it("reflects the active status from the URL", () => {
    const { getByRole } = renderWithProviders(<StatusFilter />, {
      url: "/characters?status=Dead",
    })

    expect(getByRole("radio", { name: "Dead" }).getAttribute("aria-checked")).toBe("true")
    expect(getByRole("radio", { name: "All" }).getAttribute("aria-checked")).toBe("false")
  })

  it("updates the URL and resets the page when selecting a status", async () => {
    const { getByRole } = renderWithProviders(<StatusFilter />, {
      url: "/characters?page=7",
    })

    fireEvent.click(getByRole("radio", { name: "Dead" }))

    await waitFor(() => {
      expect(window.location.search).toBe("?status=Dead")
    })
    expect(getByRole("radio", { name: "Dead" }).getAttribute("aria-checked")).toBe("true")
  })

  it("clears the status param when switching back to 'All'", async () => {
    const { getByRole } = renderWithProviders(<StatusFilter />, {
      url: "/characters?status=Alive",
    })

    fireEvent.click(getByRole("radio", { name: "All" }))

    await waitFor(() => {
      expect(window.location.search).toBe("")
    })
  })
})
