import { expect, test } from "@/support/fixtures";
import { seedItem, seedTemplate } from "@/support/seed";
import { confirmInDialog, createTemplate } from "@/support/ui";

test.describe("templates CRUD", () => {
  test("creates a template seeded with items", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    const stove = await seedItem(e2e.token, "Stove");

    await createTemplate(page, "Camping", [tent.name, stove.name]);
    await page.getByText("Camping", { exact: true }).click();

    await expect(page.getByText("Tent", { exact: true })).toBeVisible();
    await expect(page.getByText("Stove", { exact: true })).toBeVisible();
  });

  test("blocks creation when the name is empty", async ({ page }) => {
    await page.goto("/templates/create");
    await page.getByRole("button", { name: "Create", exact: true }).click();

    await expect(page).toHaveURL(/\/templates\/create/);
  });

  test("edits a template's name", async ({ page, e2e }) => {
    await seedTemplate(e2e.token, "Old name");
    await page.goto("/templates");
    await page.getByText("Old name", { exact: true }).click();
    await page.getByRole("button", { name: "Edit", exact: true }).click();

    await expect(page).toHaveURL(/\/edit/);
    await page.locator('input[name="name"]').fill("New name");
    await page.getByRole("button", { name: "Save", exact: true }).click();

    await expect(page).toHaveURL(/\/templates\//);
    await expect(page.getByRole("heading", { name: "New name" })).toBeVisible();
  });

  test("archives a template from its detail", async ({ page, e2e }) => {
    await seedTemplate(e2e.token, "To archive");
    await page.goto("/templates");
    await page.getByText("To archive", { exact: true }).click();

    await page.getByRole("button", { name: "Archive", exact: true }).click();
    await confirmInDialog(page, "Archive");

    await expect(page).toHaveURL(/\/templates$/);
  });

  test("cancel on the archive dialog keeps the template", async ({ page, e2e }) => {
    await seedTemplate(e2e.token, "Keep me");
    await page.goto("/templates");
    await page.getByText("Keep me", { exact: true }).click();

    await page.getByRole("button", { name: "Archive", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Cancel" }).click();

    await expect(page.getByRole("heading", { name: "Keep me" })).toBeVisible();
  });
});
