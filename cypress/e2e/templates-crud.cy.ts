/**
 * Template create / edit / archive with the add/remove item pickers.
 */
describe("Templates CRUD", () => {
  it("creates a template seeded with items", () => {
    cy.createItemViaUi("Tent");
    cy.createItemViaUi("Stove");

    cy.visit("/templates/create");
    cy.get('input[name="name"]').type("Camping");
    cy.contains("Tent").click();
    cy.contains("Stove").click();
    cy.contains("button", "Create").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/templates");

    cy.contains("Camping").click();
    cy.contains("Tent").should("be.visible");
    cy.contains("Stove").should("be.visible");
  });

  it("blocks creation when the name is empty", () => {
    cy.visit("/templates/create");
    cy.contains("button", "Create").click();
    cy.url().should("include", "/templates/create");
  });

  it("edits a template's name and returns to its detail", () => {
    // Seed a template via the UI.
    cy.visit("/templates/create");
    cy.get('input[name="name"]').type("Old name{enter}");
    cy.url().should("eq", Cypress.config("baseUrl") + "/templates");

    cy.contains("Old name").click();
    cy.contains("button", "Edit").click();
    cy.url().should("include", "/edit");
    cy.get('input[name="name"]').clear().type("New name{enter}");
    cy.url().should("match", /\/templates\//);
    cy.contains("New name").should("be.visible");
  });

  it("archives a template from its detail", () => {
    cy.visit("/templates/create");
    cy.get('input[name="name"]').type("To archive{enter}");
    cy.url().should("eq", Cypress.config("baseUrl") + "/templates");

    cy.contains("To archive").click();
    cy.contains("button", "Archive").click();
    cy.confirmInDialog("Archive");
    cy.url().should("eq", Cypress.config("baseUrl") + "/templates");
  });

  it("cancel on the archive dialog keeps the template", () => {
    cy.visit("/templates/create");
    cy.get('input[name="name"]').type("Keep me{enter}");
    cy.contains("Keep me").click();
    cy.contains("button", "Archive").click();
    cy.contains("button", "Cancel").click();
    cy.contains("Keep me").should("be.visible");
  });
});
