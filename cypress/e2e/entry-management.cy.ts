describe("Entry management", () => {
  it("creates, renames, and deletes a checklist entry", () => {
    cy.visit("/");
    cy.document().then((doc) =>
      cy.log("PAGE BODY:", doc.body.textContent?.slice(0, 800) ?? "(empty)"),
    );

    cy.contains("button", "Create new Entry").click();
    cy.get('input[name="name"]').type("Cypress trip{enter}");
    cy.url().should("match", /\/entry\//);
    cy.contains("h2", "Cypress trip").should("be.visible");
    cy.get('button[aria-label="Checklists"]').first().click();
    cy.contains("Edit name").click();
    cy.get('input[name="name"]').clear().type("Renamed trip{enter}");
    cy.contains("h2", "Renamed trip").should("be.visible");
    cy.get('button[aria-label="Checklists"]').first().click();
    cy.contains("Delete").click();
    cy.contains("button", "Delete").last().click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.contains("Renamed trip").should("not.exist");
  });
});
