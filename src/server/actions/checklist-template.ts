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
