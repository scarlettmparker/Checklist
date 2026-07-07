/**
 * Translation strings render, not raw i18n keys.
 */
describe("Translations", () => {
  it("renders human strings, not raw i18n keys", () => {
    cy.visit("/");
    cy.contains("button", "Create new Entry").should("be.visible");
    cy.contains("button", "Create from Templates").should("be.visible");
    // A raw key would look like "create-entry-label"; assert it is absent.
    cy.get("body").should("not.contain.text", "create-entry-label");
    cy.get("body").should("not.contain.text", "create-from-template");
  });

  it("renders translated strings on the items page too", () => {
    cy.visit("/items");
    cy.contains("button", /Create/).should("be.visible");
    cy.get("body").should("not.contain.text", "create-new-item-label");
  });
});
