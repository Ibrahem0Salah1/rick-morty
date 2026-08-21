import { expect, test } from "@playwright/test"
import { installGraphQLMocks } from "./mocks"

test.describe("Locations page", () => {
  test.beforeEach(async ({ page }) => {
    await installGraphQLMocks(page)
  })

  test("renders locations from the API", async ({ page }) => {
    await page.goto("/locations")

    const earthCard = page.getByRole("button", { name: /Earth \(Replacement Dimension\)/ })
    await expect(earthCard).toHaveCount(1)
  })

  test("load more appends the next page of results", async ({ page }) => {
    await page.goto("/locations")

    const earthCard = page.getByRole("button", { name: /Earth \(Replacement Dimension\)/ })
    await expect(earthCard).toHaveCount(1)

    await page.getByRole("button", { name: "Load more" }).click()

    await expect(earthCard).toHaveCount(2)
  })

  test("opens the location sheet with residents and closes cleanly", async ({ page }) => {
    await page.goto("/locations")

    await page.getByRole("button", { name: /Earth \(Replacement Dimension\)/ }).click()

    await expect(page).toHaveURL(/location=1/)
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText("Residents")).toBeVisible()
    await expect(dialog.getByRole("link", { name: /Rick Sanchez/ })).toBeVisible()
    
    await page.keyboard.press("Escape")

    await expect(page).not.toHaveURL(/[?&]location=/)
    await expect(dialog).not.toBeVisible()
  })
})
