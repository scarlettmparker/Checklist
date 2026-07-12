import {
  defineLoader,
  defineMutation,
  makeCacheKey,
  ServerRedirectError,
  type MutationResult,
} from "@sun/ssr";
import { executeDocument } from "~/utils/api";
import {
  ListChecklistItemsDocument,
  LocateChecklistItemDocument,
  LocateChecklistItemDetailsDocument,
  CreateChecklistItemDocument,
  SaveChecklistItemDocument,
  RetireChecklistItemDocument,
  type ChecklistItemInput,
  type ListChecklistItemsQuery,
  type LocateChecklistItemQuery,
  type LocateChecklistItemDetailsQuery,
  type CreateChecklistItemMutation,
  type SaveChecklistItemMutation,
  type RetireChecklistItemMutation,
} from "~/generated/graphql";

/**
 * Default detail when an item has none yet; loaders stay non-null so reads of
 * the detail key never throw "No data returned".
 */
const EMPTY_ITEM_DETAILS = {
  ownerId: null,
  description: null,
  remoteObject: [] as string[],
};

/**
 * Lists every checklist item for the items list.
 */
defineLoader({
  pattern: "checklist",
  async loader() {
    try {
      const result = await executeDocument<ListChecklistItemsQuery>(
        ListChecklistItemsDocument,
        { pagination: null },
      );
      if (result?.success && result.data) {
        const checklistItems = result.data.checklistQueries.items;
        if (checklistItems) {
          return { checklistItems };
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch checklist items:", error);
      return null;
    }
  },
});

/**
 * Locates the core item for the details page.
 */
defineLoader({
  pattern: "checklist/:id",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<LocateChecklistItemQuery>(
        LocateChecklistItemDocument,
        { id },
      );
      if (result?.success && result.data) {
        const item = result.data.checklistQueries.item;
        if (item) {
          return { item };
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch checklist item:", error);
      return null;
    }
  },
});

/**
 * Locates the optional detail attached to an item.
 */
defineLoader({
  pattern: "checklist/:id",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<LocateChecklistItemDetailsQuery>(
        LocateChecklistItemDetailsDocument,
        { id },
      );
      if (result?.success && result.data) {
        return {
          itemDetails:
            result.data.checklistQueries.itemDetails ?? EMPTY_ITEM_DETAILS,
        };
      }
      return { itemDetails: EMPTY_ITEM_DETAILS };
    } catch (error) {
      console.error("Failed to fetch checklist item details:", error);
      return { itemDetails: EMPTY_ITEM_DETAILS };
    }
  },
});

/**
 * Loads the item being edited.
 */
defineLoader({
  pattern: "items/:id/edit",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<LocateChecklistItemQuery>(
        LocateChecklistItemDocument,
        { id },
      );
      if (result?.success && result.data) {
        const item = result.data.checklistQueries.item;
        if (item) {
          return { item };
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch checklist item:", error);
      return null;
    }
  },
});

/**
 * Creates a new checklist item, then redirects to the items list.
 */
defineMutation({
  path: "checklist/createItem",
  async handler(body: {
    name: string;
    description?: string;
    categoryId?: string;
    icon?: string;
  }): Promise<MutationResult> {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      return {
        __typename: "StandardError",
        message: "Name is required and must be a non-empty string.",
      };
    }

    const result = await executeDocument<CreateChecklistItemMutation>(
      CreateChecklistItemDocument,
      {
        name: body.name,
        description: body.description ?? null,
        categoryId: body.categoryId ?? null,
        icon: body.icon ?? null,
      },
    );
    const data = result.data?.checklistMutations.createItem as MutationResult;

    if (
      data?.__typename === "QuerySuccess" ||
      data?.__typename === "Redirect"
    ) {
      throw new ServerRedirectError(
        "/items",
        makeCacheKey("checklist:checklistItems", {}),
      );
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to create checklist item.",
    };
  },
});

/**
 * Saves an existing checklist item, then redirects to its detail page.
 */
defineMutation({
  path: "checklist/saveItem",
  async handler(body: {
    id: string;
    name: string;
    description?: string;
    categoryId?: string;
    icon?: string;
  }): Promise<MutationResult> {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      return {
        __typename: "StandardError",
        message: "Name is required and must be a non-empty string.",
      };
    }

    const input: ChecklistItemInput = {
      id: body.id,
      name: body.name,
      description: body.description || "",
      categoryId: body.categoryId || null,
      icon: body.icon || null,
    };

    const result = await executeDocument<SaveChecklistItemMutation>(
      SaveChecklistItemDocument,
      { input },
    );
    const data = result.data?.checklistMutations.saveItem as MutationResult;

    if (
      data?.__typename === "QuerySuccess" ||
      data?.__typename === "Redirect"
    ) {
      throw new ServerRedirectError(`/items/${body.id}`, [
        makeCacheKey("checklist:checklistItems", {}),
        makeCacheKey("checklist/:id:item", { id: body.id }),
      ]);
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to save item.",
    };
  },
});

/**
 * Soft-retires a checklist item, then redirects to the items list.
 */
defineMutation({
  path: "checklist/retireItem",
  async handler(body: { id: string }): Promise<MutationResult> {
    const result = await executeDocument<RetireChecklistItemMutation>(
      RetireChecklistItemDocument,
      { id: body.id },
    );
    const data = result.data?.checklistMutations.retireItem as MutationResult;

    if (
      data?.__typename === "QuerySuccess" ||
      data?.__typename === "Redirect"
    ) {
      throw new ServerRedirectError("/items", [
        makeCacheKey("checklist:checklistItems", {}),
        makeCacheKey("checklist/:id:item", { id: body.id }),
      ]);
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to archive item.",
    };
  },
});
