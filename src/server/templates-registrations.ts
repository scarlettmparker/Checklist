import {
  defineLoader,
  defineMutation,
  makeCacheKey,
  ServerRedirectError,
  type MutationResult,
} from "@sun/ssr";
import { executeDocument } from "~/utils/api";
import {
  ListChecklistTemplatesDocument,
  ListChecklistTemplateItemsDocument,
  ListChecklistItemsDocument,
  ListChecklistEntryItemsDocument,
  LocateChecklistTemplateDocument,
  LocateChecklistTemplateDetailsDocument,
  CreateChecklistTemplateDocument,
  SaveChecklistTemplateDocument,
  ArchiveChecklistTemplateDocument,
  AddChecklistTemplateItemDocument,
  RemoveChecklistTemplateItemDocument,
  type ListChecklistTemplatesQuery,
  type ListChecklistTemplateItemsQuery,
  type ListChecklistItemsQuery,
  type ListChecklistEntryItemsQuery,
  type LocateChecklistTemplateQuery,
  type LocateChecklistTemplateDetailsQuery,
  type CreateChecklistTemplateMutation,
  type SaveChecklistTemplateMutation,
  type ArchiveChecklistTemplateMutation,
  type AddChecklistTemplateItemMutation,
  type RemoveChecklistTemplateItemMutation,
} from "~/generated/graphql";

const EMPTY_PAGE = {
  items: [],
  pageInfo: {
    page: 0,
    size: 0,
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const EMPTY_TEMPLATE_DETAILS = {
  ownerId: null,
  description: null,
  remoteObject: [] as string[],
};

/**
 * Lists every template for the templates list.
 */
defineLoader({
  pattern: "templates",
  async loader() {
    try {
      const result = await executeDocument<ListChecklistTemplatesQuery>(
        ListChecklistTemplatesDocument,
      );
      if (result?.data && result.success) {
        const templates = result.data.checklistQueries.listTemplates;
        if (templates) {
          return { templates };
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch checklist templates:", error);
      return null;
    }
  },
});

/**
 * Loads the items of an entry so the create-template form can pre-populate the
 * picker when seeding from an existing checklist.
 */
defineLoader({
  pattern: "templates/create",
  async loader(params) {
    const entryId = params.entryId as string;
    if (!entryId) return null;
    try {
      const result = await executeDocument<ListChecklistEntryItemsQuery>(
        ListChecklistEntryItemsDocument,
        { entryId, pagination: { page: 0, size: 100 } },
      );
      if (result?.success && result.data) {
        return {
          entryItems: result.data.checklistQueries.entryItems ?? EMPTY_PAGE,
        };
      }
      return { entryItems: EMPTY_PAGE };
    } catch (error) {
      console.error("Failed to fetch entry items for template seeding:", error);
      return { entryItems: EMPTY_PAGE };
    }
  },
});

/**
 * Locates the core template for the details page.
 */
defineLoader({
  pattern: "templates/:id",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<LocateChecklistTemplateQuery>(
        LocateChecklistTemplateDocument,
        { id },
      );
      if (result?.success && result.data) {
        const template = result.data.checklistQueries.template;
        if (template) {
          return { template };
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch checklist template:", error);
      return null;
    }
  },
});

/**
 * Locates the items belonging to a template (paginated client-side).
 */
defineLoader({
  pattern: "templates/:id",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<ListChecklistTemplateItemsQuery>(
        ListChecklistTemplateItemsDocument,
        {
          templateId: id,
          pagination: {
            page: Number(params.page ?? 1) - 1,
            size: 10,
          },
        },
      );
      if (result?.success && result.data) {
        return {
          templateItems:
            result.data.checklistQueries.templateItems ?? EMPTY_PAGE,
        };
      }
      return { templateItems: EMPTY_PAGE };
    } catch (error) {
      console.error("Failed to fetch checklist template items:", error);
      return { templateItems: EMPTY_PAGE };
    }
  },
});

/**
 * Locates the optional detail attached to a template.
 */
defineLoader({
  pattern: "templates/:id",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<LocateChecklistTemplateDetailsQuery>(
        LocateChecklistTemplateDetailsDocument,
        { id },
      );
      if (result?.success && result.data) {
        return {
          templateDetails:
            result.data.checklistQueries.templateDetails ??
            EMPTY_TEMPLATE_DETAILS,
        };
      }
      return { templateDetails: EMPTY_TEMPLATE_DETAILS };
    } catch (error) {
      console.error("Failed to fetch checklist template details:", error);
      return { templateDetails: EMPTY_TEMPLATE_DETAILS };
    }
  },
});

/**
 * Loads the template being edited.
 */
defineLoader({
  pattern: "templates/:id/edit",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<LocateChecklistTemplateQuery>(
        LocateChecklistTemplateDocument,
        { id },
      );
      if (result?.success && result.data) {
        const template = result.data.checklistQueries.template;
        if (template) {
          return { template };
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch checklist template:", error);
      return null;
    }
  },
});

/**
 * Loads all of the template's items for the editor.
 */
defineLoader({
  pattern: "templates/:id/edit",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<ListChecklistTemplateItemsQuery>(
        ListChecklistTemplateItemsDocument,
        { templateId: id, pagination: { page: 0, size: 100 } },
      );
      if (result?.success && result.data) {
        return {
          templateItems:
            result.data.checklistQueries.templateItems ?? EMPTY_PAGE,
        };
      }
      return { templateItems: EMPTY_PAGE };
    } catch (error) {
      console.error("Failed to fetch checklist template items:", error);
      return { templateItems: EMPTY_PAGE };
    }
  },
});

/**
 * Loads every checklist item for the add-items picker on the editor.
 */
defineLoader({
  pattern: "templates/:id/edit",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<ListChecklistItemsQuery>(
        ListChecklistItemsDocument,
        { pagination: null },
      );
      if (result?.success && result.data) {
        return {
          checklistItems: result.data.checklistQueries.items ?? EMPTY_PAGE,
        };
      }
      return { checklistItems: EMPTY_PAGE };
    } catch (error) {
      console.error("Failed to fetch checklist items for picker:", error);
      return { checklistItems: EMPTY_PAGE };
    }
  },
});

/**
 * Creates a new template, then redirects to the templates list.
 */
defineMutation({
  path: "templates/create",
  async handler(body: {
    name: string;
    description?: string;
    itemIds?: string[];
  }): Promise<MutationResult> {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      return {
        __typename: "StandardError",
        message: "Name is required and must be a non-empty string.",
      };
    }

    const result = await executeDocument<CreateChecklistTemplateMutation>(
      CreateChecklistTemplateDocument,
      {
        name: body.name,
        description: body.description ?? null,
        itemIds: body.itemIds ?? null,
      },
    );
    const data = result.data?.checklistMutations
      .createTemplate as MutationResult;

    if (
      data?.__typename === "QuerySuccess" ||
      data?.__typename === "Redirect"
    ) {
      throw new ServerRedirectError(
        "/templates",
        makeCacheKey("templates:templates", {}),
      );
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to create template.",
    };
  },
});

/**
 * Archives a template, then redirects to the templates list.
 */
defineMutation({
  path: "templates/archive",
  async handler(body: { id: string }): Promise<MutationResult> {
    const result = await executeDocument<ArchiveChecklistTemplateMutation>(
      ArchiveChecklistTemplateDocument,
      { id: body.id },
    );
    const data = result.data?.checklistMutations
      .archiveTemplate as MutationResult;

    if (
      data?.__typename === "QuerySuccess" ||
      data?.__typename === "Redirect"
    ) {
      throw new ServerRedirectError("/templates", [
        makeCacheKey("templates:templates", {}),
        makeCacheKey("templates/:id:template", { id: body.id }),
      ]);
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to archive template.",
    };
  },
});

/**
 * Saves a template's name/description, then redirects to its detail page.
 */
defineMutation({
  path: "templates/save",
  async handler(body: {
    id: string;
    name: string;
    description?: string;
  }): Promise<MutationResult> {
    const result = await executeDocument<SaveChecklistTemplateMutation>(
      SaveChecklistTemplateDocument,
      {
        input: {
          id: body.id,
          name: body.name,
          description: body.description,
        },
      },
    );
    const data = result.data?.checklistMutations.saveTemplate as MutationResult;

    if (
      data?.__typename === "QuerySuccess" ||
      data?.__typename === "Redirect"
    ) {
      throw new ServerRedirectError(`/templates/${body.id}`, [
        makeCacheKey("templates:templates", {}),
        makeCacheKey("templates/:id:template", { id: body.id }),
        makeCacheKey("templates/:id:templateItems", { id: body.id }),
      ]);
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to save template.",
    };
  },
});

/**
 * Adds an item to a template; invalidates the template's items.
 */
defineMutation({
  path: "templates/addItem",
  async handler(body: {
    templateId: string;
    itemId: string;
  }): Promise<MutationResult> {
    const result = await executeDocument<AddChecklistTemplateItemMutation>(
      AddChecklistTemplateItemDocument,
      { templateId: body.templateId, itemId: body.itemId, position: null },
    );
    const data = result.data?.checklistMutations
      .addTemplateItem as MutationResult;
    return {
      ...(data ?? {
        __typename: "StandardError",
        message: result.error || "Failed to add item.",
      }),
      invalidated: [
        makeCacheKey("templates/:id:templateItems", { id: body.templateId }),
      ],
    };
  },
});

/**
 * Removes an item from a template; invalidates the template's items.
 */
defineMutation({
  path: "templates/removeItem",
  async handler(body: {
    templateId: string;
    itemId: string;
  }): Promise<MutationResult> {
    const result = await executeDocument<RemoveChecklistTemplateItemMutation>(
      RemoveChecklistTemplateItemDocument,
      { templateId: body.templateId, itemId: body.itemId },
    );
    const data = result.data?.checklistMutations
      .removeTemplateItem as MutationResult;
    return {
      ...(data ?? {
        __typename: "StandardError",
        message: result.error || "Failed to remove item.",
      }),
      invalidated: [
        makeCacheKey("templates/:id:templateItems", { id: body.templateId }),
      ],
    };
  },
});
