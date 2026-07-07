/**
 * Item create / edit / retire (archive) and form validation.
 */
describe("Items CRUD", () => {
  it("creates an item and shows it in the list", () => {
    cy.createItemViaUi("Headlamp");
    cy.visit("/items");
    cy.contains("Headlamp").should("be.visible");
  });

  it("blocks creation when the name is empty (required field)", () => {
    cy.visit("/items/create");
    cy.contains("button", "Create").click();
    // HTML5 validation prevents submit; we stay on the create page.
    cy.url().should("include", "/items/create");
  });

  it("edits an item's name and reflects the change", () => {
    cy.createItemViaUi("Old lamp");
    cy.visit("/items");
    cy.contains("Old lamp").click(); // open the detail panel
    // The detail card's title is the only link to /edit.
    cy.get('a[href*="/edit"]').first().click();
    cy.url().should("include", "/edit");
    cy.get('input[name="name"]').clear().type("New lamp{enter}");
    cy.url().should("match", /\/items\//);
    cy.contains("New lamp").should("be.visible");
  });

  it("retires (archives) an item from its detail card", () => {
    cy.createItemViaUi("To retire");
    cy.visit("/items");
    cy.contains("To retire").click();
    cy.contains("button", "Archive").click();
    cy.confirmInDialog("Archive"); // confirm
    cy.url().should("eq", Cypress.config("baseUrl") + "/items");
  });

  it("cancel on the retire dialog keeps the item", () => {
    cy.createItemViaUi("Keep me");
    cy.visit("/items");
    cy.contains("Keep me").click();
    cy.contains("button", "Archive").click();
    cy.contains("button", "Cancel").click();
    cy.contains("Keep me").should("be.visible");
  });
});
