import { expect, test } from "@/support/fixtures";

test.describe("navigation", () => {
  test("routes to each section and back home", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();

    await nav.getByRole("link", { name: "Items" }).click();
    await expect(page).toHaveURL(/\/items/);

    await nav.getByRole("link", { name: "Templates" }).click();
    await expect(page).toHaveURL(/\/templates/);

    await nav.getByRole("link", { name: "Categories" }).click();
    await expect(page).toHaveURL(/\/categories/);

    await nav.getByRole("link", { name: "Checklists" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
