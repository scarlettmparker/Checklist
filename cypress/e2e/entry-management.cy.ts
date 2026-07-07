describe("Entry management", () => {
  it("creates, renames, and deletes a checklist entry", () => {
    cy.visit("/");
    cy.document().then((doc) =>
      cy.log("PAGE BODY:", doc.body.textContent?.slice(0, 800) ?? "(empty)"),
    );

    cy.contains("button", "Create new Entry").click();
    cy.get('input[name="name"]').type("TEST ENTRY{enter}");
    cy.url().should("match", /\/entry\//);
    cy.contains("h2", "TEST ENTRY").should("be.visible");
    cy.get('button[aria-label="Checklists"]').first().click();
    cy.contains("Edit name").click();
    cy.get('input[name="name"]').clear().type("RENAMED TEST ENTRY{enter}");
    cy.contains("h2", "RENAMED TEST ENTRY").should("be.visible");
    cy.get('button[aria-label="Checklists"]').first().click();
    cy.contains("Delete").click();
    cy.contains("button", "Delete").last().click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.contains("RENAMED TEST ENTRY").should("not.exist");
  });
});
