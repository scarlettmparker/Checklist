# Cypress runner for the e2e stack. Extends the official included image with the
# `pg` driver so the `dbReset` task can truncate the database directly.
FROM cypress/included:15.18.1
WORKDIR /e2e

# A package.json lets us install pg (Cypress' setupNodeEvents requires it).
RUN npm init -y && npm install pg

COPY cypress.config.ts ./
COPY cypress ./cypress
