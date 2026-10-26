import { expect, test } from "@/support/fixtures";

test.describe("categories", () => {
  test("creates a category and refreshes the list in place", async ({ page }) => {
    await page.goto("/categories");
    await page.getByRole("button", { name: "Create Category" }).click();

    const dialog = page.getByRole("dialog");
    await dialog.locator('input[name="name"]').fill("Gear");
    await dialog.getByRole("button", { name: "Create", exact: true }).click();

    await expect(page.getByText("Gear", { exact: true })).toBeVisible();
  });

  test("creates a second category without losing the first", async ({ page }) => {
    await page.goto("/categories");

    for (const name of ["Gear", "Food"]) {
      await page.getByRole("button", { name: "Create Category" }).click();
      const dialog = page.getByRole("dialog");
      await dialog.locator('input[name="name"]').fill(name);
      await dialog.getByRole("button", { name: "Create", exact: true }).click();
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }

    await expect(page.getByText("Gear", { exact: true })).toBeVisible();
    await expect(page.getByText("Food", { exact: true })).toBeVisible();
  });

  test("cancel does not create a category", async ({ page }) => {
    await page.goto("/categories");
    await page.getByRole("button", { name: "Create Category" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Cancel" }).click();

    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByText("No categories yet")).toBeVisible();
  });
});
