import { expect, test } from "@/support/fixtures";
import { confirmInDialog, createEntry, openEntryMenu } from "@/support/ui";

test.describe("entry CRUD", () => {
  test("creates a named entry and lands on its page", async ({ page }) => {
    await createEntry(page, "Picnic");

    await expect(page.getByRole("heading", { name: "Picnic" })).toBeVisible();
    await expect(page).toHaveURL(/\/entry\//);
  });

  test("creates an untitled entry when the name is blank", async ({ page }) => {
    await createEntry(page);

    await expect(page.getByRole("heading", { name: "Untitled entry" })).toBeVisible();
  });

  test("cancel on the create dialog does not create an entry", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Create new Entry" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Cancel" }).click();

    await expect(page.getByText("No entries yet")).toBeVisible();
  });

  test("renames an entry in place", async ({ page }) => {
    await createEntry(page, "Old name");
    await openEntryMenu(page, "Edit name");

    const dialog = page.getByRole("dialog");
    await dialog.locator('input[name="name"]').fill("New name");
    await dialog.getByRole("button", { name: "Save", exact: true }).click();

    await expect(page.getByRole("heading", { name: "New name" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Old name" })).toHaveCount(0);
  });

  test("cancel on the rename dialog leaves the name unchanged", async ({ page }) => {
    await createEntry(page, "Keep me");
    await openEntryMenu(page, "Edit name");

    const dialog = page.getByRole("dialog");
    await dialog.locator('input[name="name"]').fill("Should not save");
    await dialog.getByRole("button", { name: "Cancel" }).click();

    await expect(page.getByRole("heading", { name: "Keep me" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Should not save" })).toHaveCount(0);
  });

  test("archives an entry and redirects home", async ({ page }) => {
    await createEntry(page, "To archive");
    await openEntryMenu(page, "Archive");
    await confirmInDialog(page, "Archive");

    await expect(page).toHaveURL(/\/$/);
  });

  test("cancel on the archive dialog keeps the entry", async ({ page }) => {
    await createEntry(page, "Keep me");
    await openEntryMenu(page, "Archive");
    await page.getByRole("dialog").getByRole("button", { name: "Cancel" }).click();

    await expect(page).toHaveURL(/\/entry\//);
    await expect(page.getByRole("heading", { name: "Keep me" })).toBeVisible();
  });

  test("deletes an entry and redirects home", async ({ page }) => {
    await createEntry(page, "To delete");
    await openEntryMenu(page, "Delete");
    await confirmInDialog(page, "Delete");

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText("To delete", { exact: true })).toHaveCount(0);
  });

  test("cancel on the delete dialog keeps the entry", async ({ page }) => {
    await createEntry(page, "Keep me");
    await openEntryMenu(page, "Delete");
    await page.getByRole("dialog").getByRole("button", { name: "Cancel" }).click();

    await expect(page).toHaveURL(/\/entry\//);
    await expect(page.getByRole("heading", { name: "Keep me" })).toBeVisible();
  });
});
