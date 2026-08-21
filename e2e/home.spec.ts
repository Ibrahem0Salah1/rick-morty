import { expect, test } from "@playwright/test"
import { installGraphQLMocks } from "./mocks"

test.describe("Home landing page", () => {
  test.beforeEach(async ({ page }) => {
    await installGraphQLMocks(page)
  })

  test("renders the hero with CTAs", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Wubba Lubba")
    await expect(page.getByRole("link", { name: "Explore Characters" })).toBeVisible()
    await expect(page.getByRole("link", { name: /Explore Locations/ })).toBeVisible()
  })

  test("renders the characters section with links to details", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: "Characters" }).first()).toBeVisible()
    const rickLink = page.getByRole("link", { name: /Rick Sanchez/ }).first()
    await expect(rickLink).toBeVisible()
    await expect(rickLink).toHaveAttribute("href", "/characters/1")
  })

  test("navigates to the characters page from the hero CTA", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: "Explore Characters" }).click()

    await expect(page).toHaveURL(/\/characters$/)
    await expect(page.getByPlaceholder("Search Characters...")).toBeVisible()
  })
})
