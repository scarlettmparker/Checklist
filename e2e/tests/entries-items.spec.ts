import { expect, test } from "@/support/fixtures";
import { seedItem } from "@/support/seed";
import { addItemsToEntry, createEntry } from "@/support/ui";

test.describe("entry items", () => {
  test("adds selected items to the entry", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    await seedItem(e2e.token, "Stove");
    await createEntry(page, "Camping");

    await addItemsToEntry(page, [tent.name, "Stove"]);

    await expect(page.getByText("Tent", { exact: true })).toBeVisible();
    await expect(page.getByText("Stove", { exact: true })).toBeVisible();
  });

  test("hides already-added items from the picker", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    await seedItem(e2e.token, "Stove");
    await createEntry(page, "Camping");
    await addItemsToEntry(page, [tent.name]);

    await page.getByRole("button", { name: "Add items", exact: true }).click();

    await expect(page.getByText("All items are already added")).toHaveCount(0);
    await expect(page.getByText("Stove", { exact: true })).toBeVisible();
  });

  test("removes an item from the entry", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    await createEntry(page, "Camping");
    await addItemsToEntry(page, [tent.name]);

    await page.getByRole("button", { name: "Remove" }).first().click();

    await expect(page.getByText("Tent", { exact: true })).toHaveCount(0);
  });

  test("toggles an item complete and back", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    await seedItem(e2e.token, "Stove");
    await createEntry(page, "Camping");
    await addItemsToEntry(page, [tent.name, "Stove"]);

    const toggle = page.getByRole("checkbox").first();
    await toggle.check();
    await expect(toggle).toBeChecked();
    await toggle.uncheck();
    await expect(toggle).not.toBeChecked();
  });

  test("completes the entry when every item is checked", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    await seedItem(e2e.token, "Stove");
    await createEntry(page, "Camping");
    await addItemsToEntry(page, [tent.name, "Stove"]);

    const boxes = page.getByRole("checkbox");
    const count = await boxes.count();
    for (let index = 0; index < count; index += 1) {
      await boxes.nth(index).check();
    }

    await expect(page.getByText("Completed", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add items" })).toHaveCount(0);
  });
});
