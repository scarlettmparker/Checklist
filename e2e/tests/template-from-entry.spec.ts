import { expect, test } from "@/support/fixtures";
import { seedItem } from "@/support/seed";
import { addItemsToEntry, createEntry, openEntryMenu } from "@/support/ui";

test.describe("create template from entry", () => {
  test("pre-fills the template with the entry's items", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    const stove = await seedItem(e2e.token, "Stove");
    await createEntry(page, "Camping");
    await addItemsToEntry(page, [tent.name, stove.name]);

    await openEntryMenu(page, "Create template from entry");
    await expect(page).toHaveURL(/\/templates\/create/);
    await expect(page).toHaveURL(/entryId=/);

    await page.locator('input[name="name"]').fill("Camping template");
    await page.getByRole("button", { name: "Create", exact: true }).click();

    await expect(page).toHaveURL(/\/templates$/);
    await page.getByText("Camping template", { exact: true }).click();

    await expect(page.getByText("Tent", { exact: true })).toBeVisible();
    await expect(page.getByText("Stove", { exact: true })).toBeVisible();
  });
});
