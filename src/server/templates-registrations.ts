import { defineLoader, defineMutation, MutationError } from "@sun/ssr";
import { executeDocument } from "@sun/api";
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
 * Creates a new template and returns it.
 */
defineMutation({
  path: "templates/create",
  async handler(body: {
    name: string;
    description?: string;
    itemIds?: string[];
  }) {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      throw new MutationError(
        "Name is required and must be a non-empty string.",
      );
    }

    const result = await executeDocument<CreateChecklistTemplateMutation>(
      CreateChecklistTemplateDocument,
      {
        name: body.name,
        description: body.description ?? null,
        itemIds: body.itemIds ?? null,
      },
    );
    const response = result.data?.checklistMutations.createTemplate;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to create template.");
    }
    return response;
  },
});

/**
 * Archives a template and returns it.
 */
defineMutation({
  path: "templates/archive",
  async handler(body: { id: string }) {
    const result = await executeDocument<ArchiveChecklistTemplateMutation>(
      ArchiveChecklistTemplateDocument,
      { id: body.id },
    );
    const response = result.data?.checklistMutations.archiveTemplate;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to archive template.");
    }
    return response;
  },
});

/**
 * Saves a template's name/description and returns it.
 */
defineMutation({
  path: "templates/save",
  async handler(body: {
    id: string;
    name: string;
    description?: string;
  }) {
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
    const response = result.data?.checklistMutations.saveTemplate;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to save template.");
    }
    return response;
  },
});

/**
 * Adds an item to a template and returns the updated template.
 */
defineMutation({
  path: "templates/addItem",
  async handler(body: { templateId: string; itemId: string }) {
    const result = await executeDocument<AddChecklistTemplateItemMutation>(
      AddChecklistTemplateItemDocument,
      { templateId: body.templateId, itemId: body.itemId, position: null },
    );
    const response = result.data?.checklistMutations.addTemplateItem;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to add item.");
    }
    return response;
  },
});

/**
 * Removes an item from a template and returns the updated template.
 */
defineMutation({
  path: "templates/removeItem",
  async handler(body: { templateId: string; itemId: string }) {
    const result = await executeDocument<RemoveChecklistTemplateItemMutation>(
      RemoveChecklistTemplateItemDocument,
      { templateId: body.templateId, itemId: body.itemId },
    );
    const response = result.data?.checklistMutations.removeTemplateItem;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to remove item.");
    }
    return response;
  },
});
