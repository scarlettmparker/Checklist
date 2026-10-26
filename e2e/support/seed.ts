import {
  AddChecklistItemDocument,
  CreateChecklistCategoryDocument,
  CreateChecklistEntryDocument,
  CreateChecklistItemDocument,
  CreateChecklistTemplateDocument,
  type AddChecklistItemMutation,
  type CreateChecklistCategoryMutation,
  type CreateChecklistEntryMutation,
  type CreateChecklistItemMutation,
  type CreateChecklistTemplateMutation,
} from "../../src/generated/graphql";
import { executeGraphql } from "./graphql";

export type SeedItem = {
  /**
   * Item row id.
   */
  id: string;
  /**
   * Display name.
   */
  name: string;
};

export type SeedEntry = {
  /**
   * Entry row id.
   */
  id: string;
  /**
   * Display name.
   */
  name: string;
};

const ICON = "WrenchOutline";

/**
 * Creates an active checklist item.
 *
 * @param token the E2E user's JWT
 * @param name the item name
 * @returns the created item
 */
export async function seedItem(token: string, name: string): Promise<SeedItem> {
  const data = await executeGraphql<CreateChecklistItemMutation>(
    CreateChecklistItemDocument,
    { name, icon: ICON },
    token,
  );

  return { id: data.checklistMutations.createItem.item.id, name };
}

/**
 * Creates a checklist category.
 *
 * @param token the E2E user's JWT
 * @param name the category name
 * @returns the category id
 */
export async function seedCategory(token: string, name: string): Promise<string> {
  const data = await executeGraphql<CreateChecklistCategoryMutation>(
    CreateChecklistCategoryDocument,
    { name },
    token,
  );

  return data.checklistMutations.createCategory.category.id;
}

/**
 * Creates an active template with the given items.
 *
 * @param token the E2E user's JWT
 * @param name the template name
 * @param itemIds the item ids to attach
 * @returns the template id
 */
export async function seedTemplate(
  token: string,
  name: string,
  itemIds: string[] = [],
): Promise<string> {
  const data = await executeGraphql<CreateChecklistTemplateMutation>(
    CreateChecklistTemplateDocument,
    { name, itemIds },
    token,
  );

  return data.checklistMutations.createTemplate.template.id;
}

/**
 * Creates an active entry with the given items.
 *
 * @param token the E2E user's JWT
 * @param name the entry name
 * @param itemIds the item ids to attach
 * @returns the created entry
 */
export async function seedEntry(
  token: string,
  name: string,
  itemIds: string[] = [],
): Promise<SeedEntry> {
  const data = await executeGraphql<CreateChecklistEntryMutation>(
    CreateChecklistEntryDocument,
    { name },
    token,
  );
  const entry = data.checklistMutations.createChecklist.entry;

  for (const itemId of itemIds) {
    await executeGraphql<AddChecklistItemMutation>(
      AddChecklistItemDocument,
      { entryId: entry.id, itemId },
      token,
    );
  }

  return { id: entry.id, name };
}
