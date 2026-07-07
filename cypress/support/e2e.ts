/// <reference types="cypress" />

/**
 * Global Cypress commands for Checklist functional tests.
 */

type MutationResult =
  | { __typename: "QuerySuccess"; id?: string | null; message: string }
  | { __typename: "StandardError"; message: string };

declare global {
  namespace Cypress {
    interface Chainable {
      /** Run a server mutation through the app's /<name> endpoint. */
      mutate(
        name: string,
        body: Record<string, unknown>,
      ): Chainable<MutationResult>;
    }
  }
}

Cypress.Commands.add("mutate", (name, body) => {
  return cy
    .request("POST", `/${name}`, body)
    .then((response) => response.body as MutationResult);
});

/**
 * Every test starts from a clean database.
 */
beforeEach(() => {
  cy.task("dbReset");
});

export {};
