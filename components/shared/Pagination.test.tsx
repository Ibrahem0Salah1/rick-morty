import { fireEvent, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { renderWithProviders } from "@/test/test-utils"
import { Pagination } from "./Pagination"

describe("Pagination", () => {
  it("renders page links around the current page with ellipsis", () => {
    const { getByRole, queryByRole, getAllByText } = renderWithProviders(
      <Pagination totalPages={42} />,
      { url: "/characters" },
    )

    expect(getByRole("navigation", { name: "pagination" })).toBeInTheDocument()
    for (const page of ["1", "2", "3", "42"]) {
      expect(getByRole("button", { name: page })).toBeInTheDocument()
    }
    expect(queryByRole("button", { name: "4" })).not.toBeInTheDocument()
    expect(getAllByText("More pages")).toHaveLength(1)
  })

  it("shows ellipsis on both sides in the middle of the range", () => {
    const { getByRole, queryByRole, getAllByText } = renderWithProviders(
      <Pagination totalPages={42} />,
      { url: "/characters?page=5" },
    )

    expect(getByRole("button", { name: "1" })).toBeInTheDocument()
    expect(getByRole("button", { name: "3" })).toBeInTheDocument()
    expect(getByRole("button", { name: "7" })).toBeInTheDocument()
    expect(getByRole("button", { name: "42" })).toBeInTheDocument()
    expect(queryByRole("button", { name: "2" })).not.toBeInTheDocument()
    expect(getAllByText("More pages")).toHaveLength(2)
  })

  it("disables 'Previous' on the first page", () => {
    const { getByRole } = renderWithProviders(<Pagination totalPages={42} />, {
      url: "/characters",
    })

    expect(
      getByRole("button", { name: "Go to previous page" }).className.split(/\s+/),
    ).toContain("pointer-events-none")
    expect(
      getByRole("button", { name: "Go to next page" }).className.split(/\s+/),
    ).not.toContain("pointer-events-none")
  })

  it("'Next' is disabled on the last page", () => {
    const { getByRole } = renderWithProviders(<Pagination totalPages={42} />, {
      url: "/characters?page=42",
    })

    expect(
      getByRole("button", { name: "Go to next page" }).className.split(/\s+/),
    ).toContain("pointer-events-none")
  })

  it("navigates when clicking a page number", async () => {
    const { getByRole } = renderWithProviders(<Pagination totalPages={42} />, {
      url: "/characters",
    })

    fireEvent.click(getByRole("button", { name: "3" }))

    await waitFor(() => {
      expect(window.location.search).toBe("?page=3")
    })
    expect(getByRole("button", { name: "3" }).getAttribute("aria-current")).toBe("page")
  })

  it("goes back when clicking 'Previous'", async () => {
    const { getByRole } = renderWithProviders(<Pagination totalPages={42} />, {
      url: "/characters?page=8",
    })

    fireEvent.click(getByRole("button", { name: "Go to previous page" }))

    await waitFor(() => {
      expect(window.location.search).toBe("?page=7")
    })
  })

  it("renders nothing when there is only one page", () => {
    const { container } = renderWithProviders(<Pagination totalPages={1} />, {
      url: "/characters",
    })

    expect(container.querySelector('nav[aria-label="pagination"]')).toBeNull()
  })
})
