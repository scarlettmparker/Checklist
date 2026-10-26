import { expect, test } from "@/support/fixtures";

test.describe("i18n", () => {
  test("renders human strings on the entries page", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Create new Entry" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Create from Templates" })).toBeVisible();
    await expect(page.getByText("create-entry-label")).toHaveCount(0);
    await expect(page.getByText("create-from-template")).toHaveCount(0);
  });

  test("renders human strings on the items page", async ({ page }) => {
    await page.goto("/items");

    await expect(page.getByRole("button", { name: "Create New Item" })).toBeVisible();
    await expect(page.getByText("create-new-item-label")).toHaveCount(0);
  });
});
