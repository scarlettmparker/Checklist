import { executeMutation, MutationResult } from "@sun/ssr";
import { ItemStatus } from "~/generated/graphql";

/**
 * Creates a blank checklist entry; the handler redirects into the new entry.
 */
export async function createEntry(name?: string): Promise<MutationResult> {
  const result = await executeMutation("entry/create", { name });
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
  name?: string,
): Promise<MutationResult> {
  const result = await executeMutation("entry/createFromTemplate", {
    templateId,
    name,
  });
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
  return executeMutation("entry/addItem", { entryId, itemId });
}

/** Removes an item from an entry. */
export async function removeEntryItem(
  entryId: string,
  itemId: string,
): Promise<MutationResult> {
  return executeMutation("entry/removeItem", { entryId, itemId });
}

/** Sets the status of an item within an entry (e.g. COMPLETE / NOT_STARTED). */
export async function setEntryItemStatus(
  entryId: string,
  itemId: string,
  status: ItemStatus,
): Promise<MutationResult> {
  return executeMutation("entry/setItemStatus", { entryId, itemId, status });
}

/** Marks an entry as complete (idempotent; cannot be un-completed). */
export async function completeChecklistEntry(
  entryId: string,
): Promise<MutationResult> {
  return executeMutation("entry/completeChecklist", { entryId });
}

/** Archives an entry. */
export async function archiveEntry(entryId: string): Promise<MutationResult> {
  const result = await executeMutation("entry/archiveChecklist", { entryId });
  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }
  return result;
}

/** Permanently deletes an entry and its items. */
export async function deleteEntry(entryId: string): Promise<MutationResult> {
  const result = await executeMutation("entry/delete", { entryId });
  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }
  return result;
}

/** Saves an entry's name (and other editable fields). */
export async function saveEntry(
  entryId: string,
  name: string,
): Promise<MutationResult> {
  return executeMutation("entry/save", { id: entryId, name });
}

/** Creates a checklist entry composed from multiple templates; redirects. */
export async function createEntryFromTemplates(
  templateIds: string[],
  name?: string,
): Promise<MutationResult> {
  const result = await executeMutation("entry/createFromTemplates", {
    templateIds,
    name,
  });
  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }
  return result;
}
