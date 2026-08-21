import { expect, test } from "@playwright/test"
import { installGraphQLMocks } from "./mocks"

test.describe("Characters page", () => {
  test.beforeEach(async ({ page }) => {
    await installGraphQLMocks(page)
  })

  test("lists characters with pagination controls", async ({ page }) => {
    await page.goto("/characters")

    await expect(page.getByPlaceholder("Search Characters...")).toBeVisible()
    await expect(page.getByRole("link", { name: /Rick Sanchez/ }).first()).toBeVisible()
    await expect(page.getByRole("button", { name: "42", exact: true })).toBeVisible()
  })

  test("debounced search filters the grid", async ({ page }) => {
    await page.goto("/characters")

    const input = page.getByPlaceholder("Search Characters...")
    await input.fill("morty")

    await expect(page).toHaveURL(/q=morty/)
    await expect(page.getByRole("link", { name: /Morty Smith/ })).toBeVisible()
    await expect(page.getByRole("link", { name: /Rick Sanchez/ })).toHaveCount(0)
  })

  test("status filter updates the URL and resets to page one", async ({ page }) => {
    await page.goto("/characters?page=7")

    await page.getByRole("radio", { name: "Dead" }).click()

    await expect(page).toHaveURL(/status=Dead/)
    await expect(page).not.toHaveURL(/page=7/)
  })

  test("pagination navigates and marks the active page", async ({ page }) => {
    await page.goto("/characters")

    await page.getByRole("button", { name: "3", exact: true }).click()

    await expect(page).toHaveURL(/page=3/)
    await expect(page.getByRole("button", { name: "3", exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })
})
