import { executeMutation, MutationResult } from "@sun/ssr";
import { ItemStatus } from "~/generated/graphql";

/**
 * Creates a blank checklist entry; the handler redirects into the new entry.
 */
export async function createEntry(): Promise<MutationResult> {
  const result = await executeMutation("entries/create", {});
  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }
  return result;
}

/**
 * Creates a checklist entry seeded from a template; the handler redirects into
 * the new (pre-populated) entry.
 */
export async function createEntryFromTemplate(
  templateId: string,
): Promise<MutationResult> {
  const result = await executeMutation("entries/createFromTemplate", { templateId });
  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }
  return result;
}

/** Adds an item to an entry. */
export async function addEntryItem(
  entryId: string,
  itemId: string,
): Promise<MutationResult> {
  return executeMutation("entries/addItem", { entryId, itemId });
}

/** Removes an item from an entry. */
export async function removeEntryItem(
  entryId: string,
  itemId: string,
): Promise<MutationResult> {
  return executeMutation("entries/removeItem", { entryId, itemId });
}

/** Sets the status of an item within an entry (e.g. COMPLETE / NOT_STARTED). */
export async function setEntryItemStatus(
  entryId: string,
  itemId: string,
  status: ItemStatus,
): Promise<MutationResult> {
  return executeMutation("entries/setItemStatus", { entryId, itemId, status });
}
