/**
 * "Create template from entry" pre-fills the new template with the entry's items.
 */
describe("Create template from entry", () => {
  it("pre-fills the template with the entry's items", () => {
    cy.createItemViaUi("Tent");
    cy.createItemViaUi("Stove");

    // Entry with both items.
    cy.createEntryViaUi("Camping");
    cy.contains("button", "Add items").click();
    cy.contains("Tent").click();
    cy.contains("Stove").click();
    cy.contains("button", "Add selected").click();

    // Trigger "Create template from this entry" from the entry menu.
    cy.openEntryMenu("Create template from entry");
    cy.url().should("include", "/templates/create");
    cy.url().should("include", "entryId=");

    // Give the template a name and create it - items are pre-selected.
    cy.get('input[name="name"]').type("Camping template{enter}");
    cy.url().should("eq", Cypress.config("baseUrl") + "/templates");

    // The new template carries the entry's items.
    cy.contains("Camping template").click();
    cy.contains("Tent").should("be.visible");
    cy.contains("Stove").should("be.visible");
  });
});
