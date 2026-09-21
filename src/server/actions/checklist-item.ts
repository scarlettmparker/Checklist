import { executeMutation } from "@sun/ssr";
import type {
  CreateItemResponse,
  RetireItemResponse,
  SaveItemResponse,
} from "~/generated/graphql";

/**
 * Creates a new checklist item and navigates to the items list.
 *
 * @param name Name of the checklist item.
 * @param description Description of the checklist item.
 * @param categoryId Id of the category to which the checklist item belongs.
 * @param icon Heroicons name to display with the item.
 */
export async function createChecklistItem(
  name: string,
  description?: string,
  categoryId?: string,
  icon?: string,
): Promise<CreateItemResponse> {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required and must be a non-empty string.");
  }

  const response = await executeMutation<CreateItemResponse>(
    "checklist/createItem",
    {
      name,
      description: description || "",
      categoryId: categoryId || null,
      icon: icon || null,
    },
  );

  window.location.assign("/items");
  return response;
}

/**
 * Updates an existing checklist item and navigates to its detail page.
 *
 * @param id Id of the checklist item to update.
 * @param name Name of the checklist item.
 * @param description Description of the checklist item.
 * @param categoryId Id of the category to which the checklist item belongs.
 * @param icon Heroicons name to display with the item.
 */
export async function saveChecklistItem(
  id: string,
  name: string,
  description?: string,
  categoryId?: string,
  icon?: string,
): Promise<SaveItemResponse> {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required and must be a non-empty string.");
  }

  const response = await executeMutation<SaveItemResponse>(
    "checklist/saveItem",
    {
      id,
      name,
      description: description || "",
      categoryId: categoryId || null,
      icon: icon || null,
    },
  );

  window.location.assign(`/items/${id}`);
  return response;
}

/**
 * Retires (archives) a checklist item and navigates to the items list.
 *
 * @param id Id of the checklist item to retire.
 */
export async function retireChecklistItem(
  id: string,
): Promise<RetireItemResponse> {
  const response = await executeMutation<RetireItemResponse>(
    "checklist/retireItem",
    { id },
  );

  window.location.assign("/items");
  return response;
}
