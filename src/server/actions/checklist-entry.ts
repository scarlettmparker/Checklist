import { executeMutation } from "@sun/ssr";
import { ItemStatus } from "~/generated/graphql";
import type {
  AddItemResponse,
  ArchiveChecklistResponse,
  CompleteChecklistResponse,
  CreateChecklistFromTemplateResponse,
  CreateChecklistFromTemplatesResponse,
  CreateChecklistResponse,
  DeleteChecklistResponse,
  RemoveItemResponse,
  SaveChecklistResponse,
  SetItemStatusResponse,
} from "~/generated/graphql";

/**
 * Creates a blank checklist entry and navigates into it.
 */
export async function createEntry(
  name?: string,
): Promise<CreateChecklistResponse> {
  const response = await executeMutation<CreateChecklistResponse>(
    "entry/create",
    { name },
  );
  window.location.assign(`/entry/${response.entry.id}`);
  return response;
}

/**
 * Creates a checklist entry seeded from a template and navigates into it.
 */
export async function createEntryFromTemplate(
  templateId: string,
  name?: string,
): Promise<CreateChecklistFromTemplateResponse> {
  const response = await executeMutation<CreateChecklistFromTemplateResponse>(
    "entry/createFromTemplate",
    { templateId, name },
  );
  window.location.assign(`/entry/${response.entry.id}`);
  return response;
}

/**
 * Creates a checklist entry composed from multiple templates and navigates into it.
 */
export async function createEntryFromTemplates(
  templateIds: string[],
  name?: string,
): Promise<CreateChecklistFromTemplatesResponse> {
  const response = await executeMutation<CreateChecklistFromTemplatesResponse>(
    "entry/createFromTemplates",
    { templateIds, name },
  );
  window.location.assign(`/entry/${response.entry.id}`);
  return response;
}

/**
 * Adds an item to an entry.
 */
export async function addEntryItem(
  entryId: string,
  itemId: string,
): Promise<AddItemResponse> {
  return executeMutation<AddItemResponse>("entry/addItem", { entryId, itemId });
}

/**
 * Removes an item from an entry.
 */
export async function removeEntryItem(
  entryId: string,
  itemId: string,
): Promise<RemoveItemResponse> {
  return executeMutation<RemoveItemResponse>("entry/removeItem", {
    entryId,
    itemId,
  });
}

/**
 * Sets the status of an item within an entry.
 */
export async function setEntryItemStatus(
  entryId: string,
  itemId: string,
  status: ItemStatus,
): Promise<SetItemStatusResponse> {
  return executeMutation<SetItemStatusResponse>("entry/setItemStatus", {
    entryId,
    itemId,
    status,
  });
}

/**
 * Marks an entry as complete (idempotent; cannot be un-completed).
 */
export async function completeChecklistEntry(
  entryId: string,
): Promise<CompleteChecklistResponse> {
  return executeMutation<CompleteChecklistResponse>("entry/completeChecklist", {
    entryId,
  });
}

/**
 * Archives an entry and navigates home.
 */
export async function archiveEntry(
  entryId: string,
): Promise<ArchiveChecklistResponse> {
  const response = await executeMutation<ArchiveChecklistResponse>(
    "entry/archiveChecklist",
    { entryId },
  );
  window.location.assign("/");
  return response;
}

/**
 * Permanently deletes an entry and its items, then navigates home.
 */
export async function deleteEntry(
  entryId: string,
): Promise<DeleteChecklistResponse> {
  const response = await executeMutation<DeleteChecklistResponse>(
    "entry/delete",
    { entryId },
  );
  window.location.assign("/");
  return response;
}

/**
 * Saves an entry's name (and other editable fields).
 */
export async function saveEntry(
  entryId: string,
  name: string,
): Promise<SaveChecklistResponse> {
  return executeMutation<SaveChecklistResponse>("entry/save", {
    id: entryId,
    name,
  });
}
