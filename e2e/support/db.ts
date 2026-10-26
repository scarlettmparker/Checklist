import bcrypt from "bcryptjs";
import pg from "pg";

import { DATABASE_URL, E2E_PASSWORD } from "./env";

const { Client } = pg;

export type Db = {
  /**
   * Runs a query and returns the resulting rows.
   *
   * @param sql the SQL to run
   * @param values bound parameters
   * @returns the resulting rows
   */
  query: <T extends pg.QueryResultRow>(sql: string, values?: unknown[]) => Promise<T[]>;
  /**
   * Creates the E2E account and returns its id.
   *
   * @param username the login username
   * @returns the new account id
   */
  createUser: (username: string) => Promise<string>;
  /**
   * Deletes the E2E account and its person row.
   *
   * @param accountId the account to remove
   */
  deleteUser: (accountId: string) => Promise<void>;
  /**
   * Clears checklist data created by the suite.
   */
  resetChecklistData: () => Promise<void>;
  /**
   * Closes the underlying connection.
   */
  close: () => Promise<void>;
};

/**
 * Opens a Postgres connection to the disposable E2E database.
 *
 * @returns the connected database helper
 */
export async function createDb(): Promise<Db> {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  const query = async <T extends pg.QueryResultRow>(
    sql: string,
    values: unknown[] = [],
  ): Promise<T[]> => {
    const result = await client.query<T>(sql, values);
    return result.rows;
  };

  return {
    query,
    async createUser(username) {
      const accountId = crypto.randomUUID();
      const personId = crypto.randomUUID();

      await query(
        `INSERT INTO fates_people (id, first_name, last_name, display_name, email)
         VALUES ($1, 'E2E', 'Checklist', $2, $3)`,
        [personId, username, `${username}@example.com`],
      );
      await query(
        `INSERT INTO gaia_accounts
           (id, account_type, password_hash, person_id, status, username, provider)
         VALUES ($1, 'HUMAN', $2, $3, 'ACTIVE', $4, 'local')`,
        [accountId, bcrypt.hashSync(E2E_PASSWORD, 10), personId, username],
      );

      return accountId;
    },
    async deleteUser(accountId) {
      const rows = await query<{ person_id: string }>(
        "DELETE FROM gaia_accounts WHERE id = $1 RETURNING person_id",
        [accountId],
      );
      if (rows[0]) {
        await query("DELETE FROM fates_people WHERE id = $1", [rows[0].person_id]);
      }
    },
    async resetChecklistData() {
      await query(
        `TRUNCATE TABLE
           echo_checklist_entry_items,
           echo_checklist_entry_details,
           echo_checklist_entries,
           echo_checklist_template_items,
           echo_checklist_template_details,
           echo_checklist_templates,
           echo_checklist_item_details,
           echo_checklist_items,
           echo_checklist_categories
         RESTART IDENTITY CASCADE`,
      );
    },
    close: () => client.end(),
  };
}
