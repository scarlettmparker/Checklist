/**
 * Nav bar routes to each section and back home.
 */
describe("Navigation", () => {
  it("routes to Items, Templates, Categories, and back to Checklists", () => {
    cy.visit("/");
    cy.get("nav").should("be.visible");

    cy.get("nav").contains("a", "Items").click();
    cy.url().should("include", "/items");

    cy.get("nav").contains("a", "Templates").click();
    cy.url().should("include", "/templates");

    cy.get("nav").contains("a", "Categories").click();
    cy.url().should("include", "/categories");

    cy.get("nav").contains("a", "Checklists").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
});
