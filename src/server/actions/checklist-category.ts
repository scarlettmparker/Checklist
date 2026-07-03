import { executeMutation, MutationResult } from "@sun/ssr";

/**
 * Creates a new checklist category.
 * @param name Name of the category.
 * @param description Description of the category.
 * @returns A promise resolving to the result of the mutation.
 */
export async function createChecklistCategory(
  name: string,
  description?: string,
): Promise<MutationResult> {
  if (typeof name !== "string" || name.trim() === "") {
    return {
      __typename: "StandardError",
      message: "Name is required and must be a non-empty string.",
    };
  }

  const result = await executeMutation("categories/create", {
    name,
    description: description || "",
  });

  return result;
}
