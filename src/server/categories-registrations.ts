import {
  defineLoader,
  defineMutation,
  makeCacheKey,
  type MutationResult,
} from "@sun/ssr";
import { executeDocument } from "~/utils/api";
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
 * Creates a new category; invalidates the categories list.
 */
defineMutation({
  path: "categories/create",
  async handler(body: {
    name: string;
    description?: string;
  }): Promise<MutationResult> {
    const result = await executeDocument<CreateChecklistCategoryMutation>(
      CreateChecklistCategoryDocument,
      {
        name: body.name,
        description: body.description ?? null,
      },
    );
    const data = result.data?.checklistMutations
      .createCategory as MutationResult;

    return {
      ...(data ?? {
        __typename: "StandardError",
        message: result.error || "Failed to create category.",
      }),
      invalidated: [makeCacheKey("categories:categories", {})],
    };
  },
});
