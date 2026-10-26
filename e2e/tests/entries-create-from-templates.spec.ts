import { expect, test } from "@/support/fixtures";
import { seedItem, seedTemplate } from "@/support/seed";

test.describe("create entry from templates", () => {
  test("composes an entry from a template with a custom name", async ({ page, e2e }) => {
    const tent = await seedItem(e2e.token, "Tent");
    await seedTemplate(e2e.token, "Camping template", [tent.id]);

    await page.goto("/");
    await page.getByRole("button", { name: "Create from Templates" }).click();
    await expect(page).toHaveURL(/\/entry\/create/);

    await page.locator('input[name="name"]').fill("Weekend trip");
    await page.getByText("Camping template", { exact: true }).click();
    await page.getByRole("button", { name: "Create checklist" }).click();

    await expect(page).toHaveURL(/\/entry\//);
    await expect(page.getByRole("heading", { name: "Weekend trip" })).toBeVisible();
    await expect(page.getByText("Tent", { exact: true })).toBeVisible();
  });
});
