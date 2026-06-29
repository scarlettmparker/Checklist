import { executeMutation, MutationResult } from "@sun/ssr";

/**
 * Creates a new checklist item.
 * @param name Name of the checklist item.
 * @param description Description of the checklist item.
 * @param categoryId Id of the category to which the checklist item belongs.
 * @param icon Heroicons name to display with the item.
 * @returns A promise resolving to the result of the mutation.
 */
export async function createChecklistItem(
  name: string,
  description?: string,
  categoryId?: string,
  icon?: string,
): Promise<MutationResult> {
  if (typeof name !== "string" || name.trim() === "") {
    return {
      __typename: "StandardError",
      message: "Name is required and must be a non-empty string.",
    };
  }

  const result = await executeMutation("checklist/createItem", {
    name,
    description: description || "",
    categoryId: categoryId || null,
    icon: icon || null,
  });

  if (result.__typename === "Redirect") {
    window.location.assign(result.redirectTo);
  }

  return result;
}
