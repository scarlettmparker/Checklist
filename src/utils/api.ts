/**
 * Generic API helper for making GraphQL requests.
 */

import { print, DocumentNode } from "graphql";
import {
  ListChecklistItemsDocument,
  LocateChecklistItemDocument,
  ListChecklistEntriesDocument,
  LocateChecklistEntryDocument,
  ListChecklistTemplatesDocument,
  LocateChecklistTemplateDocument,
  LocateChecklistTemplateDetailsDocument,
  LocateChecklistEntryDetailsDocument,
  LocateChecklistItemDetailsDocument,
  ListChecklistTemplateItemsDocument,
  ListChecklistCategoriesDocument,
  LocateRemoteObjectsDocument,
  CreateChecklistItemDocument,
  CreateChecklistItemMutation,
  SaveChecklistItemDocument,
  SaveChecklistItemMutation,
  ChecklistItemInput,
  RetireChecklistItemDocument,
  RetireChecklistItemMutation,
  CreateChecklistCategoryDocument,
  CreateChecklistCategoryMutation,
  SaveChecklistCategoryDocument,
  SaveChecklistCategoryMutation,
  ChecklistCategoryInput,
  CreateChecklistEntryDocument,
  CreateChecklistEntryMutation,
  CreateChecklistFromTemplateDocument,
  CreateChecklistFromTemplateMutation,
  SaveChecklistEntryDocument,
  SaveChecklistEntryMutation,
  ChecklistEntryInput,
  CompleteChecklistDocument,
  CompleteChecklistMutation,
  ArchiveChecklistDocument,
  ArchiveChecklistMutation,
  CreateChecklistTemplateDocument,
  CreateChecklistTemplateMutation,
  SaveChecklistTemplateDocument,
  SaveChecklistTemplateMutation,
  ChecklistTemplateInput,
  ArchiveChecklistTemplateDocument,
  ArchiveChecklistTemplateMutation,
  AddChecklistItemDocument,
  AddChecklistItemMutation,
  RemoveChecklistItemDocument,
  RemoveChecklistItemMutation,
  SetChecklistItemStatusDocument,
  SetChecklistItemStatusMutation,
  AddChecklistTemplateItemDocument,
  AddChecklistTemplateItemMutation,
  RemoveChecklistTemplateItemDocument,
  RemoveChecklistTemplateItemMutation,
  AttachChecklistObjectDocument,
  AttachChecklistObjectMutation,
} from "~/generated/graphql";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
};

/**
 * Type definition for the operation registry.
 */
type OperationRegistry = {
  checklistQueries: {
    items: DocumentNode;
    item: DocumentNode;
    entry: DocumentNode;
    template: DocumentNode;
    templateDetails: DocumentNode;
    entryDetails: DocumentNode;
    itemDetails: DocumentNode;
    templateItems: DocumentNode;
    listEntries: DocumentNode;
    listTemplates: DocumentNode;
    listCategories: DocumentNode;
    locateRemoteObjects: DocumentNode;
  };
  checklistMutations: {
    createItem: DocumentNode;
    saveItem: DocumentNode;
    retireItem: DocumentNode;
    createCategory: DocumentNode;
    saveCategory: DocumentNode;
    createChecklist: DocumentNode;
    createChecklistFromTemplate: DocumentNode;
    saveChecklist: DocumentNode;
    completeChecklist: DocumentNode;
    archiveChecklist: DocumentNode;
    createTemplate: DocumentNode;
    saveTemplate: DocumentNode;
    archiveTemplate: DocumentNode;
    addItem: DocumentNode;
    removeItem: DocumentNode;
    setItemStatus: DocumentNode;
    addTemplateItem: DocumentNode;
    removeTemplateItem: DocumentNode;
    attachObject: DocumentNode;
  };
};

/**
 * Registry of GraphQL operations mapped to their query documents.
 */
const operationRegistry: OperationRegistry = {
  checklistQueries: {
    items: ListChecklistItemsDocument,
    item: LocateChecklistItemDocument,
    entry: LocateChecklistEntryDocument,
    template: LocateChecklistTemplateDocument,
    templateDetails: LocateChecklistTemplateDetailsDocument,
    entryDetails: LocateChecklistEntryDetailsDocument,
    itemDetails: LocateChecklistItemDetailsDocument,
    templateItems: ListChecklistTemplateItemsDocument,
    listEntries: ListChecklistEntriesDocument,
    listTemplates: ListChecklistTemplatesDocument,
    listCategories: ListChecklistCategoriesDocument,
    locateRemoteObjects: LocateRemoteObjectsDocument,
  },
  checklistMutations: {
    createItem: CreateChecklistItemDocument,
    saveItem: SaveChecklistItemDocument,
    retireItem: RetireChecklistItemDocument,
    createCategory: CreateChecklistCategoryDocument,
    saveCategory: SaveChecklistCategoryDocument,
    createChecklist: CreateChecklistEntryDocument,
    createChecklistFromTemplate: CreateChecklistFromTemplateDocument,
    saveChecklist: SaveChecklistEntryDocument,
    completeChecklist: CompleteChecklistDocument,
    archiveChecklist: ArchiveChecklistDocument,
    createTemplate: CreateChecklistTemplateDocument,
    saveTemplate: SaveChecklistTemplateDocument,
    archiveTemplate: ArchiveChecklistTemplateDocument,
    addItem: AddChecklistItemDocument,
    removeItem: RemoveChecklistItemDocument,
    setItemStatus: SetChecklistItemStatusDocument,
    addTemplateItem: AddChecklistTemplateItemDocument,
    removeTemplateItem: RemoveChecklistTemplateItemDocument,
    attachObject: AttachChecklistObjectDocument,
  },
};

/**
 * Retrieves a GraphQL operation document by its namespaced path.
 *
 * @param path The dot-separated path to the operation
 * @returns The DocumentNode if found, otherwise undefined.
 */
function getOperation(path: string): DocumentNode | undefined {
  const parts = path.split(".");
  let current: unknown = operationRegistry;
  for (const part of parts) {
    if (
      current &&
      typeof current === "object" &&
      current !== null &&
      part in current
    ) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current as DocumentNode;
}

/**
 * Registers a new GraphQL operation with its query document.
 *
 * @param operationName The name of the operation.
 * @param queryDocument The GraphQL query document.
 */
export function registerGraphQLOperation(
  operationName: string,
  queryDocument: DocumentNode,
): void {
  (operationRegistry as Record<string, unknown>)[operationName] = queryDocument;
}

/**
 * Retry with backoff function.
 */
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  delays: number[],
): Promise<T> => {
  let lastError: unknown;
  for (let i = 0; i <= delays.length; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < delays.length) {
        await new Promise((resolve) => setTimeout(resolve, delays[i]));
      }
    }
  }
  throw lastError;
};

/**
 * Generic function to fetch data from GraphQL server.
 *
 * @param operationName The name of the GraphQL operation to execute.
 * @param variables Variables for the operation (if any).
 * @returns Promise resolving to ApiResponse.
 */
export async function fetchGraphQLData<
  T,
  V extends Record<string, unknown> | undefined = Record<string, unknown>,
>(operationName: string, variables?: V): Promise<ApiResponse<T>> {
  const endpoint =
    process.env.GRAPHQL_ENDPOINT || "http://localhost:8083/graphql";

  const query = getOperation(operationName);
  if (!query) {
    return {
      success: false,
      error: "Unknown operation",
      statusCode: 400,
    };
  }

  try {
    return await retryWithBackoff(async () => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: print(query),
          variables,
        }),
      });

      if (!response.ok) {
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      const result = await response.json();

      if (result.errors) {
        throw {
          message: result.errors
            .map((e: { message: string }) => e.message)
            .join(", "),
          statusCode: 400,
        };
      }

      if (!result.data) {
        throw { message: "No data returned", statusCode: 400 };
      }

      return {
        success: true,
        data: result.data,
      };
    }, [500, 2000, 4000, 6000]);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      "statusCode" in error
    ) {
      return {
        success: false,
        error: error.message as string,
        statusCode: error.statusCode as number,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    };
  }
}

/** Lists checklist items. */
export async function fetchListChecklistItems(
  page?: number,
  size?: number,
  sortBy?: string,
  sortDir?: string,
) {
  return fetchGraphQLData("checklistQueries.items", {
    page: page ?? null,
    size: size ?? null,
    sortBy: sortBy ?? null,
    sortDir: sortDir ?? null,
  });
}

/** Locates a single checklist item by id. */
export async function fetchLocateChecklistItem(id: string) {
  return fetchGraphQLData("checklistQueries.item", { id });
}

/** Lists all checklist entries. */
export async function fetchListChecklistEntries() {
  return fetchGraphQLData("checklistQueries.listEntries");
}

/** Locates a single checklist entry by id. */
export async function fetchLocateChecklistEntry(id: string) {
  return fetchGraphQLData("checklistQueries.entry", { id });
}

/** Lists all checklist templates. */
export async function fetchListChecklistTemplates() {
  return fetchGraphQLData("checklistQueries.listTemplates");
}

/** Locates a single checklist template by id, without its detail. */
export async function fetchLocateChecklistTemplate(id: string) {
  return fetchGraphQLData("checklistQueries.template", { id });
}

/** Locates the detail for a template. */
export async function fetchLocateChecklistTemplateDetails(id: string) {
  return fetchGraphQLData("checklistQueries.templateDetails", { id });
}

/** Locates the detail for an entry. */
export async function fetchLocateChecklistEntryDetails(id: string) {
  return fetchGraphQLData("checklistQueries.entryDetails", { id });
}

/** Locates the detail for an item. */
export async function fetchLocateChecklistItemDetails(id: string) {
  return fetchGraphQLData("checklistQueries.itemDetails", { id });
}

/** Lists the items belonging to a template. */
export async function fetchListChecklistTemplateItems(templateId: string) {
  return fetchGraphQLData("checklistQueries.templateItems", { templateId });
}

/** Lists all checklist categories. */
export async function fetchListChecklistCategories() {
  return fetchGraphQLData("checklistQueries.listCategories");
}

/** Finds the checklist details that reference any of the given object ids. */
export async function fetchLocateRemoteObjects(ids: string[]) {
  return fetchGraphQLData("checklistQueries.locateRemoteObjects", { ids });
}

/** Creates a new checklist item. */
export async function mutateCreateChecklistItem(
  name: string,
  description?: string,
  categoryId?: string,
) {
  return fetchGraphQLData<CreateChecklistItemMutation>(
    "checklistMutations.createItem",
    {
      name,
      description: description ?? null,
      categoryId: categoryId ?? null,
    },
  );
}

/** Creates or updates a checklist item from input. */
export async function mutateSaveChecklistItem(input: ChecklistItemInput) {
  return fetchGraphQLData<SaveChecklistItemMutation>(
    "checklistMutations.saveItem",
    {
      input,
    },
  );
}

/** Soft-retires a checklist item. */
export async function mutateRetireChecklistItem(id: string) {
  return fetchGraphQLData<RetireChecklistItemMutation>(
    "checklistMutations.retireItem",
    { id },
  );
}

/** Creates a new checklist category. */
export async function mutateCreateChecklistCategory(
  name: string,
  description?: string,
) {
  return fetchGraphQLData<CreateChecklistCategoryMutation>(
    "checklistMutations.createCategory",
    {
      name,
      description: description ?? null,
    },
  );
}

/** Creates or updates a checklist category from input. */
export async function mutateSaveChecklistCategory(
  input: ChecklistCategoryInput,
) {
  return fetchGraphQLData<SaveChecklistCategoryMutation>(
    "checklistMutations.saveCategory",
    { input },
  );
}

/** Creates an empty checklist entry. */
export async function mutateCreateChecklistEntry(name?: string) {
  return fetchGraphQLData<CreateChecklistEntryMutation>(
    "checklistMutations.createChecklist",
    {
      name: name ?? null,
    },
  );
}

/** Creates a checklist entry seeded from a template. */
export async function mutateCreateChecklistFromTemplate(templateId: string) {
  return fetchGraphQLData<CreateChecklistFromTemplateMutation>(
    "checklistMutations.createChecklistFromTemplate",
    { templateId },
  );
}

/** Creates or updates a checklist entry from input. */
export async function mutateSaveChecklistEntry(input: ChecklistEntryInput) {
  return fetchGraphQLData<SaveChecklistEntryMutation>(
    "checklistMutations.saveChecklist",
    {
      input,
    },
  );
}

/** Marks a checklist entry as complete. */
export async function mutateCompleteChecklist(id: string) {
  return fetchGraphQLData<CompleteChecklistMutation>(
    "checklistMutations.completeChecklist",
    {
      id,
    },
  );
}

/** Archives a checklist entry. */
export async function mutateArchiveChecklist(id: string) {
  return fetchGraphQLData<ArchiveChecklistMutation>(
    "checklistMutations.archiveChecklist",
    {
      id,
    },
  );
}

/** Creates a template, optionally seeded with items. */
export async function mutateCreateChecklistTemplate(
  name: string,
  description?: string,
  itemIds?: string[],
) {
  return fetchGraphQLData<CreateChecklistTemplateMutation>(
    "checklistMutations.createTemplate",
    {
      name,
      description: description ?? null,
      itemIds: itemIds ?? null,
    },
  );
}

/** Creates or updates a checklist template from input. */
export async function mutateSaveChecklistTemplate(
  input: ChecklistTemplateInput,
) {
  return fetchGraphQLData<SaveChecklistTemplateMutation>(
    "checklistMutations.saveTemplate",
    { input },
  );
}

/** Archives a checklist template. */
export async function mutateArchiveChecklistTemplate(id: string) {
  return fetchGraphQLData<ArchiveChecklistTemplateMutation>(
    "checklistMutations.archiveTemplate",
    { id },
  );
}

/** Adds an item to an entry. */
export async function mutateAddChecklistItem(
  entryId: string,
  itemId: string,
  position?: number,
) {
  return fetchGraphQLData<AddChecklistItemMutation>(
    "checklistMutations.addItem",
    {
      entryId,
      itemId,
      position: position ?? null,
    },
  );
}

/** Removes an item from an entry. */
export async function mutateRemoveChecklistItem(
  entryId: string,
  itemId: string,
) {
  return fetchGraphQLData<RemoveChecklistItemMutation>(
    "checklistMutations.removeItem",
    {
      entryId,
      itemId,
    },
  );
}

/** Sets the status of an item within an entry. */
export async function mutateSetChecklistItemStatus(
  entryId: string,
  itemId: string,
  status: string,
) {
  return fetchGraphQLData<SetChecklistItemStatusMutation>(
    "checklistMutations.setItemStatus",
    {
      entryId,
      itemId,
      status,
    },
  );
}

/** Adds an item to a template. */
export async function mutateAddChecklistTemplateItem(
  templateId: string,
  itemId: string,
  position?: number,
) {
  return fetchGraphQLData<AddChecklistTemplateItemMutation>(
    "checklistMutations.addTemplateItem",
    {
      templateId,
      itemId,
      position: position ?? null,
    },
  );
}

/** Removes an item from a template. */
export async function mutateRemoveChecklistTemplateItem(
  templateId: string,
  itemId: string,
) {
  return fetchGraphQLData<RemoveChecklistTemplateItemMutation>(
    "checklistMutations.removeTemplateItem",
    {
      templateId,
      itemId,
    },
  );
}

/** Attaches a foreign object to a checklist detail. */
export async function mutateAttachChecklistObject(
  source: string,
  target: string,
  ownerType?: "ENTRY" | "TEMPLATE" | "ITEM",
) {
  return fetchGraphQLData<AttachChecklistObjectMutation>(
    "checklistMutations.attachObject",
    {
      source,
      target,
      ownerType: ownerType ?? null,
    },
  );
}
