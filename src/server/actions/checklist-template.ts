import { executeMutation, MutationResult } from "@sun/ssr";

/**
 * Creates a new checklist template, optionally seeded with items.
 *
 * @param name Name of the template.
 * @param description Description of the template.
 * @param itemIds Ids of items to attach to the template.
 * @returns A promise resolving to the result of the mutation.
 */
export async function createChecklistTemplate(
  name: string,
  description?: string,
  itemIds: string[] = [],
): Promise<MutationResult> {
  if (typeof name !== "string" || name.trim() === "") {
    return {
      __typename: "StandardError",
      message: "Name is required and must be a non-empty string.",
    };
  }

  const result = await executeMutation("templates/create", {
    name,
    description: description || "",
    itemIds,
  });

  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }

  return result;
}

/**
 * Saves (creates or updates) a checklist template.
 * @param id Id of the template.
 * @param name Name of the template.
 * @param description Description of the template.
 * @returns A promise resolving to the result of the mutation.
 */
export async function saveChecklistTemplate(
  id: string,
  name: string,
  description?: string,
): Promise<MutationResult> {
  if (typeof name !== "string" || name.trim() === "") {
    return {
      __typename: "StandardError",
      message: "Name is required and must be a non-empty string.",
    };
  }

  const result = await executeMutation("templates/save", {
    id,
    name,
    description: description || "",
  });

  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }

  return result;
}

/**
 * Archives a checklist template.
 * @param id Id of the template to archive.
 * @returns A promise resolving to the result of the mutation.
 */
export async function archiveChecklistTemplate(
  id: string,
): Promise<MutationResult> {
  const result = await executeMutation("templates/archive", { id });

  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }

  return result;
}

/**
 * Adds an item to a template.
 * @param templateId Id of the template.
 * @param itemId Id of the item to add.
 * @returns A promise resolving to the result of the mutation.
 */
export async function addTemplateItem(
  templateId: string,
  itemId: string,
): Promise<MutationResult> {
  return executeMutation("templates/addItem", { templateId, itemId });
}

/**
 * Removes an item from a template.
 * @param templateId Id of the template.
 * @param itemId Id of the item to remove.
 * @returns A promise resolving to the result of the mutation.
 */
export async function removeTemplateItem(
  templateId: string,
  itemId: string,
): Promise<MutationResult> {
  return executeMutation("templates/removeItem", { templateId, itemId });
}
