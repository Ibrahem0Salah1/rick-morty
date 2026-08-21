import { expect, test } from "@playwright/test"
import { installGraphQLMocks } from "./mocks"

test.describe("Character detail page", () => {
  test.beforeEach(async ({ page }) => {
    await installGraphQLMocks(page)
  })

  test("shows the character header with status badge", async ({ page }) => {
    await page.goto("/characters/1")

    await expect(page.getByRole("heading", { level: 1, name: "Rick Sanchez" })).toBeVisible()
    await expect(page.getByText("Alive").first()).toBeVisible()
    await expect(page.getByText(/\d+ episodes/)).toBeVisible()
  })

  test("groups episodes into season tabs", async ({ page }) => {
    await page.goto("/characters/1")

    await expect(page.getByRole("tab", { name: /Season 1/ })).toBeVisible()
    await expect(page.getByText("Pilot")).toBeVisible()
  })
})
