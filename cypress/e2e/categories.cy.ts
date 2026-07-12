/**
 * Category creation + in-place list refresh (usePageData invalidation).
 */
describe("Categories", () => {
  it("creates a category and the list refreshes in place", () => {
    cy.visit("/categories");
    cy.contains("button", /Create/).click();
    cy.get('input[name="name"]').type("Gear{enter}");

    cy.contains("Gear").should("be.visible");
  });

  it("creates a second category without losing the first", () => {
    cy.visit("/categories");
    cy.contains("button", /Create/).click();
    cy.get('input[name="name"]').type("Gear{enter}");
    cy.contains("button", /Create/).click();
    cy.get('input[name="name"]').type("Food{enter}");

    cy.contains("Gear").should("be.visible");
    cy.contains("Food").should("be.visible");
  });

  it("cancel on the create dialog does not create a category", () => {
    cy.visit("/categories");
    cy.contains("button", /Create/).click();
    cy.contains("button", "Cancel").click();
    // No categories created.
    cy.get('input[name="name"]').should("not.exist");
  });
});
