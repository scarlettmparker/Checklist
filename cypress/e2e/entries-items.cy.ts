/**
 * Entry items: add, remove, duplicate guard, status toggle, completion lock.
 */
describe("Entry items", () => {
  beforeEach(() => {
    // Two items available to add.
    cy.createItemViaUi("Tent");
    cy.createItemViaUi("Stove");
    cy.createEntryViaUi("Camping");
  });

  it("adds selected items to the entry", () => {
    cy.contains("button", "Add items").click();
    cy.contains("Tent").click();
    cy.contains("Stove").click();
    cy.contains("button", "Add selected").click();

    cy.contains("Tent").should("be.visible");
    cy.contains("Stove").should("be.visible");
  });

  it("hides already-added items from the picker (duplicate guard)", () => {
    cy.contains("button", "Add items").click();
    cy.contains("Tent").click();
    cy.contains("button", "Add selected").click();

    // Reopen the picker; Tent must no longer be selectable.
    cy.contains("button", "Add items").click();
    cy.contains("All items are already added").should("not.exist");
    cy.contains("Stove").should("be.visible");
    cy.contains("Tent").should("not.exist");
  });

  it("removes an item from the entry", () => {
    cy.contains("button", "Add items").click();
    cy.contains("Tent").click();
    cy.contains("button", "Add selected").click();
    cy.contains("Tent").should("be.visible");

    // Each row has a remove button (aria-label "Remove").
    cy.get('button[aria-label="Remove"]').first().click();
    cy.contains("Tent").should("not.exist");
  });

  it("toggles an item to complete and back", () => {
    cy.contains("button", "Add items").click();
    cy.contains("Tent").click();
    cy.contains("button", "Add selected").click();

    // The item row's checkbox toggles status.
    cy.get('input[type="checkbox"]').first().as("statusToggle");
    cy.get("@statusToggle").check();
    cy.get("@statusToggle").should("be.checked");
    cy.get("@statusToggle").uncheck();
    cy.get("@statusToggle").should("not.be.checked");
  });

  it("completes the entry when every item is checked and then locks it", () => {
    cy.contains("button", "Add items").click();
    cy.contains("Tent").click();
    cy.contains("Stove").click();
    cy.contains("button", "Add selected").click();

    // Check every item row.
    cy.get("body").then(($body) => {
      cy.wrap($body).find('input[type="checkbox"]').each(($cb) => {
        cy.wrap($cb).check({ force: true });
      });
    });

    cy.contains("Completed").should("be.visible");
    // Once completed, the Add items button is hidden (entry locked).
    cy.contains("button", "Add items").should("not.exist");
  });
});
