import { executeMutation } from "@sun/ssr";
import type { CreateCategoryResponse } from "~/generated/graphql";

/**
 * Creates a new checklist category.
 *
 * @param name Name of the category.
 * @param description Description of the category.
 */
export async function createChecklistCategory(
  name: string,
  description?: string,
): Promise<CreateCategoryResponse> {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required and must be a non-empty string.");
  }

  return executeMutation<CreateCategoryResponse>("categories/create", {
    name,
    description: description || "",
  });
}
