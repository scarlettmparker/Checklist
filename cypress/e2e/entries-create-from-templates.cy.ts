/**
 * Compose-a-checklist-from-templates flow, including the name field.
 */
describe("Create entry from templates", () => {
  beforeEach(() => {
    // Seed an item + a template containing it.
    cy.mutate("checklist/createItem", { name: "Tent" });
    cy.visit("/templates/create");
    cy.get('input[name="name"]').type("Camping template");
    cy.contains("Tent").click(); // picker row toggles selection
    cy.contains("button", "Create").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/templates");
  });

  it("composes an entry from a template with a custom name", () => {
    cy.visit("/");
    cy.contains("button", "Create from Templates").click();
    cy.url().should("include", "/entry/create");

    cy.get('input[name="name"]').type("Weekend trip");
    cy.contains("Camping template").click();
    cy.contains("button", "Create checklist").click();

    cy.url().should("match", /\/entry\//);
    cy.contains("h2", "Weekend trip").should("be.visible");
    // The template's item was cloned into the new entry.
    cy.contains("Tent").should("be.visible");
  });
});
