/// <reference types="cypress" />
/**
 * Shared commands + seed helpers for the functional tests.
 */

type MutationResult =
  | { __typename: "QuerySuccess"; id?: string | null; message: string }
  | { __typename: "StandardError"; message: string }
  | { __typename: "Redirect"; redirectTo: string };

declare global {
  namespace Cypress {
    interface Chainable {
      mutate(
        name: string,
        body: Record<string, unknown>,
      ): Chainable<MutationResult>;
      createItemViaUi(name: string): Chainable<void>;
      createEntryViaUi(name?: string): Chainable<string>;
      openEntryMenu(item: string): Chainable<void>;
      /** Click a button inside the currently-open dialog (avoids page-behind ambiguity). */
      confirmInDialog(label: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("mutate", (name, body) =>
  cy
    .request({
      method: "POST",
      url: `/${name}`,
      body,
      headers: { origin: Cypress.config("baseUrl") as string },
    })
    .then((r) => r.body as MutationResult),
);

Cypress.Commands.add("createItemViaUi", (name) => {
  cy.visit("/items/create");
  cy.get('form input[name="name"]').first().type(name);
  cy.contains("button", "Create").click();
  cy.url().should("eq", Cypress.config("baseUrl") + "/items");
});

Cypress.Commands.add("createEntryViaUi", (name) => {
  cy.visit("/");
  cy.contains("button", "Create new Entry").click();
  cy.get('form input[name="name"]')
    .first()
    .type(`${name ?? ""}{enter}`);
  cy.url().should("match", /\/entry\//);
  return cy.url().then((url) => url.split("/entry/")[1]);
});

Cypress.Commands.add("openEntryMenu", (item) => {
  cy.get('button[aria-label="Checklists"]').first().click();
  cy.contains(item).click();
});

Cypress.Commands.add("confirmInDialog", (label) => {
  cy.get('[role="dialog"]').contains("button", label).click();
});

const FAKE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJleHAiOjQxMDI0NDQ4MDB9.Ndd95m1-cByzst52BlI-P16nVy4ce5qbuylQhK49K7Y";

beforeEach(() => {
  // Truncate the DB, then clear the app's in-memory page-data cache so the next
  // SSR render fetches fresh - together these give each test a clean slate.
  cy.task("dbReset");
  cy.request({
    method: "POST",
    url: "/__reset-cache",
    failOnStatusCode: false,
  });
  cy.visit("/", { failOnStatusCode: false });
  cy.setCookie("checklist_auth", FAKE_JWT, { path: "/", secure: false });
});

/** Log URL + a body snippet after each test so failures self-diagnose. */
afterEach(() => {
  cy.url().then((url) =>
    cy.document().then((doc) => {
      const text = (doc.body.textContent || "")
        .replace(/\s+/g, " ")
        .slice(0, 300);
      cy.task("log", `[after ${url}] ${text}`);
    }),
  );
});

export {};
