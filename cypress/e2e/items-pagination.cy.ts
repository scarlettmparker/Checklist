/**
 * Items list paginates without crashing.
 */
describe("Items pagination", () => {
  beforeEach(() => {
    // 12 items → two pages of 10. Seed via the mutation API (faster than UI).
    Cypress._.times(12, (i) =>
      cy.mutate("checklist/createItem", {
        name: `Item ${String(i + 1).padStart(2, "0")}`,
      }),
    );
  });

  it("paginates the items list without crashing", () => {
    cy.visit("/items");
    // Page 1 shows the first 10; item 12 is not visible yet.
    cy.contains("Item 01").should("be.visible");
    cy.contains("Item 12").should("not.exist");

    // Go to the last page.
    cy.get('button[aria-label="Next page"]').click();
    cy.contains("Item 12").should("be.visible");
    cy.contains("Item 01").should("not.exist");

    // Back to the first page.
    cy.get('button[aria-label="Previous page"]').click();
    cy.contains("Item 01").should("be.visible");
  });
});
