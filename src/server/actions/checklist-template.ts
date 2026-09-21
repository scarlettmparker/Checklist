import { executeMutation } from "@sun/ssr";
import type {
  AddTemplateItemResponse,
  ArchiveTemplateResponse,
  CreateTemplateResponse,
  RemoveTemplateItemResponse,
  SaveTemplateResponse,
} from "~/generated/graphql";

/**
 * Creates a new checklist template, optionally seeded with items, then
 * navigates to the templates list.
 *
 * @param name Name of the template.
 * @param description Description of the template.
 * @param itemIds Ids of items to attach to the template.
 */
export async function createChecklistTemplate(
  name: string,
  description?: string,
  itemIds: string[] = [],
): Promise<CreateTemplateResponse> {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required and must be a non-empty string.");
  }

  const response = await executeMutation<CreateTemplateResponse>(
    "templates/create",
    {
      name,
      description: description || "",
      itemIds,
    },
  );

  window.location.assign("/templates");
  return response;
}

/**
 * Saves (creates or updates) a checklist template and navigates to its detail
 * page.
 *
 * @param id Id of the template.
 * @param name Name of the template.
 * @param description Description of the template.
 */
export async function saveChecklistTemplate(
  id: string,
  name: string,
  description?: string,
): Promise<SaveTemplateResponse> {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required and must be a non-empty string.");
  }

  const response = await executeMutation<SaveTemplateResponse>(
    "templates/save",
    {
      id,
      name,
      description: description || "",
    },
  );

  window.location.assign(`/templates/${id}`);
  return response;
}

/**
 * Archives a checklist template and navigates to the templates list.
 *
 * @param id Id of the template to archive.
 */
export async function archiveChecklistTemplate(
  id: string,
): Promise<ArchiveTemplateResponse> {
  const response = await executeMutation<ArchiveTemplateResponse>(
    "templates/archive",
    { id },
  );

  window.location.assign("/templates");
  return response;
}

/**
 * Adds an item to a template.
 *
 * @param templateId Id of the template.
 * @param itemId Id of the item to add.
 */
export async function addTemplateItem(
  templateId: string,
  itemId: string,
): Promise<AddTemplateItemResponse> {
  return executeMutation<AddTemplateItemResponse>("templates/addItem", {
    templateId,
    itemId,
  });
}

/**
 * Removes an item from a template.
 *
 * @param templateId Id of the template.
 * @param itemId Id of the item to remove.
 */
export async function removeTemplateItem(
  templateId: string,
  itemId: string,
): Promise<RemoveTemplateItemResponse> {
  return executeMutation<RemoveTemplateItemResponse>("templates/removeItem", {
    templateId,
    itemId,
  });
}
