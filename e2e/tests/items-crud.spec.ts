import { expect, test } from "@/support/fixtures";
import { seedItem } from "@/support/seed";
import { confirmInDialog, createItem } from "@/support/ui";

test.describe("items CRUD", () => {
  test("creates an item and shows it in the list", async ({ page }) => {
    await createItem(page, "Headlamp");

    await expect(page.getByText("Headlamp", { exact: true })).toBeVisible();
  });

  test("blocks creation when the name is empty", async ({ page }) => {
    await page.goto("/items/create");
    await page.getByRole("button", { name: "Create", exact: true }).click();

    await expect(page).toHaveURL(/\/items\/create/);
  });

  test("edits an item's name", async ({ page, e2e }) => {
    await seedItem(e2e.token, "Old lamp");
    await page.goto("/items");
    await page.getByText("Old lamp", { exact: true }).click();

    await page.locator('a[href*="/edit"]').first().click();
    await expect(page).toHaveURL(/\/edit/);

    await page.locator('input[name="name"]').fill("New lamp");
    await page.getByRole("button", { name: "Save", exact: true }).click();

    await expect(page).toHaveURL(/\/items\//);
    await expect(page.getByRole("heading", { name: "New lamp" })).toBeVisible();
  });

  test("archives an item from its detail card", async ({ page, e2e }) => {
    await seedItem(e2e.token, "To retire");
    await page.goto("/items");
    await page.getByText("To retire", { exact: true }).click();

    await page.getByRole("button", { name: "Archive", exact: true }).click();
    await confirmInDialog(page, "Archive");

    await expect(page).toHaveURL(/\/items$/);
  });

  test("cancel on the archive dialog keeps the item", async ({ page, e2e }) => {
    await seedItem(e2e.token, "Keep me");
    await page.goto("/items");
    await page.getByText("Keep me", { exact: true }).click();

    await page.getByRole("button", { name: "Archive", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Cancel" }).click();

    await expect(page.getByRole("heading", { name: "Keep me" })).toBeVisible();
  });
});
