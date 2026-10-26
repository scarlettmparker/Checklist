import { expect, test } from "@/support/fixtures";
import { seedItem } from "@/support/seed";

test.describe("items pagination", () => {
  test("paginates the items list", async ({ page, e2e }) => {
    for (let index = 1; index <= 12; index += 1) {
      await seedItem(e2e.token, `Item ${String(index).padStart(2, "0")}`);
    }

    await page.goto("/items");
    await expect(page.getByText("Item 01", { exact: true })).toBeVisible();
    await expect(page.getByText("Item 12", { exact: true })).toHaveCount(0);

    await page.getByRole("button", { name: "Next page" }).click();
    await expect(page.getByText("Item 12", { exact: true })).toBeVisible();
    await expect(page.getByText("Item 01", { exact: true })).toHaveCount(0);

    await page.getByRole("button", { name: "Previous page" }).click();
    await expect(page.getByText("Item 01", { exact: true })).toBeVisible();
  });
});
