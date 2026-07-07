/// <reference types="cypress" />

/**
 * Global Cypress commands for Checklist functional tests.
 *
 * Mutations go through the app's own SSR layer: POSTing to /<mutationName>
 * exercises the same registry the UI uses, so seeding mirrors real usage. The
 * app forwards them to the sun-graphql backend and stamps redirect/invalidate
 * cookies exactly as a user click would.
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
 * Every test starts from a clean database: truncate all tables via the dbReset
 * task (fast, schema-preserving). Seeding then happens against a known-empty
 * slate, so tests stay order-independent and parallelisable.
 */
beforeEach(() => {
  cy.task("dbReset");
});

export {};
