/**
 * Entry (checklist) create / rename / archive / delete and dialog cancels.
 */
describe("Entry CRUD", () => {
  it("creates a named entry and lands on its page", () => {
    cy.createEntryViaUi("Picnic").then((id) => {
      expect(id).to.be.a("string").and.not.to.be.empty;
    });
    cy.contains("h2", "Picnic").should("be.visible");
    cy.url().should("match", /\/entry\//);
  });

  it("creates an untitled entry when the name is left blank", () => {
    cy.createEntryViaUi();
    cy.contains("h2", "Untitled entry").should("be.visible");
  });

  it("cancel on the create dialog does not create an entry", () => {
    cy.visit("/");
    cy.contains("button", "Create new Entry").click();
    cy.contains("button", "Cancel").click();
    cy.contains("No entries yet").should("be.visible");
  });

  it("renames an entry and the new name reflects in place without a reload", () => {
    cy.createEntryViaUi("Old name");
    cy.openEntryMenu("Edit name");
    cy.get('input[name="name"]').clear().type("New name{enter}");
    // In-place invalidation via usePageData: header updates, URL unchanged.
    cy.url().should("match", /\/entry\//);
    cy.contains("h2", "New name").should("be.visible");
    cy.contains("h2", "Old name").should("not.exist");
  });

  it("cancel on the rename dialog leaves the name unchanged", () => {
    cy.createEntryViaUi("Keep me");
    cy.openEntryMenu("Edit name");
    cy.get('input[name="name"]').clear().type("Should not save");
    cy.contains("button", "Cancel").click();
    cy.contains("h2", "Keep me").should("be.visible");
    cy.contains("h2", "Should not save").should("not.exist");
  });

  it("archives an entry and redirects home", () => {
    cy.createEntryViaUi("To archive");
    cy.openEntryMenu("Archive");
    cy.confirmInDialog("Archive");
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("cancel on the archive dialog keeps the entry", () => {
    cy.createEntryViaUi("Keep me");
    cy.openEntryMenu("Archive");
    cy.contains("button", "Cancel").click();
    // Still on the entry page.
    cy.url().should("match", /\/entry\//);
    cy.contains("h2", "Keep me").should("be.visible");
  });

  it("deletes an entry permanently and redirects home", () => {
    cy.createEntryViaUi("To delete");
    cy.openEntryMenu("Delete");
    cy.confirmInDialog("Delete");
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.contains("To delete").should("not.exist");
  });

  it("cancel on the delete dialog keeps the entry", () => {
    cy.createEntryViaUi("Keep me");
    cy.openEntryMenu("Delete");
    cy.contains("button", "Cancel").click();
    cy.url().should("match", /\/entry\//);
    cy.contains("h2", "Keep me").should("be.visible");
  });
});
