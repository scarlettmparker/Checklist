import { expect, type Page } from "@playwright/test";

/**
 * Creates an item through the UI and lands on the items list.
 *
 * @param page the Playwright page
 * @param name the item name
 */
export async function createItem(page: Page, name: string): Promise<void> {
  await page.goto("/items/create");
  await page.locator('input[name="name"]').fill(name);
  await page.getByRole("button", { name: "Create", exact: true }).click();
  await expect(page).toHaveURL(/\/items$/);
}

/**
 * Creates a checklist entry through the home dialog.
 *
 * @param page the Playwright page
 * @param name the entry name
 */
export async function createEntry(page: Page, name?: string): Promise<void> {
  await page.goto("/");
  await page.getByRole("button", { name: "Create new Entry" }).click();

  const dialog = page.getByRole("dialog");
  await dialog.locator('input[name="name"]').fill(name ?? "");
  await dialog.getByRole("button", { name: "Create", exact: true }).click();

  await expect(page).toHaveURL(/\/entry\//);
}

/**
 * Opens an entry action from the header menu.
 *
 * @param page the Playwright page
 * @param label the menu item label
 */
export async function openEntryMenu(page: Page, label: string): Promise<void> {
  await page.locator('button[aria-label="Checklists"][aria-haspopup="menu"]').click();
  await page.getByRole("menuitem", { name: label }).click();
}

/**
 * Clicks a button inside the open dialog.
 *
 * @param page the Playwright page
 * @param label the button label
 */
export async function confirmInDialog(page: Page, label: string): Promise<void> {
  await page.getByRole("dialog").getByRole("button", { name: label, exact: true }).click();
}

/**
 * Creates a template with the given items through the create page.
 *
 * @param page the Playwright page
 * @param name the template name
 * @param items the item names to select
 */
export async function createTemplate(page: Page, name: string, items: string[]): Promise<void> {
  await page.goto("/templates/create");
  await page.locator('input[name="name"]').fill(name);

  for (const item of items) {
    await page.getByText(item, { exact: true }).last().click();
  }

  await page.getByRole("button", { name: "Create", exact: true }).click();
  await expect(page).toHaveURL(/\/templates$/);
}

/**
 * Adds items to the open entry.
 *
 * @param page the Playwright page
 * @param items the item names to add
 */
export async function addItemsToEntry(page: Page, items: string[]): Promise<void> {
  await page.getByRole("button", { name: "Add items", exact: true }).click();

  for (const item of items) {
    await page.getByText(item, { exact: true }).last().click();
  }

  await page.getByRole("button", { name: "Add selected", exact: true }).click();
}
