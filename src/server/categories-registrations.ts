import { defineLoader, defineMutation, MutationError } from "@sun/ssr";
import { executeDocument } from "@sun/api";
import {
  ListChecklistCategoriesDocument,
  CreateChecklistCategoryDocument,
  type ListChecklistCategoriesQuery,
  type CreateChecklistCategoryMutation,
} from "~/generated/graphql";

/**
 * Lists every category (non-null sentinel so the list never throws on read).
 */
defineLoader({
  pattern: "categories",
  async loader() {
    try {
      const result = await executeDocument<ListChecklistCategoriesQuery>(
        ListChecklistCategoriesDocument,
      );
      if (result?.data && result.success) {
        const categories = result.data.checklistQueries.listCategories;
        return { categories: categories ?? [] };
      }
      return { categories: [] };
    } catch (error) {
      console.error("Failed to fetch checklist categories:", error);
      return { categories: [] };
    }
  },
});

/**
 * Creates a new category and returns it.
 */
defineMutation({
  path: "categories/create",
  async handler(body: { name: string; description?: string }) {
    const result = await executeDocument<CreateChecklistCategoryMutation>(
      CreateChecklistCategoryDocument,
      {
        name: body.name,
        description: body.description ?? null,
      },
    );
    const response = result.data?.checklistMutations.createCategory;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to create category.");
    }
    return response;
  },
});
