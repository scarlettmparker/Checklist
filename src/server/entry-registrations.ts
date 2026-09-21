import { defineLoader, defineMutation, MutationError } from "@sun/ssr";
import { executeDocument } from "@sun/api";
import {
  ListChecklistEntriesDocument,
  ListChecklistTemplatesDocument,
  ListChecklistTemplateItemsDocument,
  ListChecklistEntryItemsDocument,
  ListChecklistItemsDocument,
  LocateChecklistEntryDocument,
  LocateChecklistEntryDetailsDocument,
  LocateGalleryItemsDocument,
  CreateChecklistEntryDocument,
  CreateChecklistFromTemplateDocument,
  CreateChecklistFromTemplatesDocument,
  AddChecklistItemDocument,
  RemoveChecklistItemDocument,
  SetChecklistItemStatusDocument,
  CompleteChecklistDocument,
  ArchiveChecklistDocument,
  DeleteChecklistDocument,
  SaveChecklistEntryDocument,
  GetPresignedUploadUrlDocument,
  CreateGalleryItemDocument,
  AttachChecklistObjectDocument,
  DetachChecklistObjectDocument,
  DeleteFileDocument,
  ItemStatus,
  RemoteObjectType,
  type ListChecklistEntriesQuery,
  type ListChecklistTemplatesQuery,
  type ListChecklistTemplateItemsQuery,
  type ListChecklistEntryItemsQuery,
  type ListChecklistItemsQuery,
  type LocateChecklistEntryQuery,
  type LocateChecklistEntryDetailsQuery,
  type LocateGalleryItemsQuery,
  type CreateChecklistEntryMutation,
  type CreateChecklistFromTemplateMutation,
  type CreateChecklistFromTemplatesMutation,
  type AddChecklistItemMutation,
  type RemoveChecklistItemMutation,
  type SetChecklistItemStatusMutation,
  type CompleteChecklistMutation,
  type ArchiveChecklistMutation,
  type DeleteChecklistMutation,
  type SaveChecklistEntryMutation,
  type GetPresignedUploadUrlMutation,
  type CreateGalleryItemMutation,
  type AttachChecklistObjectMutation,
  type DetachChecklistObjectMutation,
  type DeleteFileMutation,
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

/**
 * Lists every entry (non-null sentinel so the home list never throws on read).
 */
defineLoader({
  pattern: "entry",
  async loader() {
    try {
      const result = await executeDocument<ListChecklistEntriesQuery>(
        ListChecklistEntriesDocument,
      );
      if (result?.data && result.success) {
        const entries = result.data.checklistQueries.listEntries;
        return { entry: entries ?? [] };
      }
      return { entry: [] };
    } catch (error) {
      console.error("Failed to fetch checklist entries:", error);
      return { entry: [] };
    }
  },
});

/**
 * Loads every template and its items so the composer can preview a merged set.
 */
defineLoader({
  pattern: "entry/create",
  async loader() {
    try {
      const templatesResult =
        await executeDocument<ListChecklistTemplatesQuery>(
          ListChecklistTemplatesDocument,
        );
      const templates =
        templatesResult?.data?.checklistQueries.listTemplates ?? [];

      const templateItems: Record<string, unknown> = {};
      for (const template of templates) {
        const result = await executeDocument<ListChecklistTemplateItemsQuery>(
          ListChecklistTemplateItemsDocument,
          {
            templateId: template.id,
            pagination: { page: 0, size: 100 },
          },
        );
        templateItems[template.id] =
          result?.data?.checklistQueries.templateItems?.items ?? [];
      }

      return { composeData: { templates, templateItems } };
    } catch (error) {
      console.error("Failed to fetch compose data:", error);
      return { composeData: { templates: [], templateItems: {} } };
    }
  },
});

/**
 * Locates the entry for the checklist page.
 */
defineLoader({
  pattern: "entry/:id",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<LocateChecklistEntryQuery>(
        LocateChecklistEntryDocument,
        { id },
      );
      if (result?.success && result.data) {
        const entry = result.data.checklistQueries.entry;
        if (entry) {
          return { entry };
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch checklist entry:", error);
      return null;
    }
  },
});

/**
 * Loads the entry's items.
 */
defineLoader({
  pattern: "entry/:id/items",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const result = await executeDocument<ListChecklistEntryItemsQuery>(
        ListChecklistEntryItemsDocument,
        { entryId: id, pagination: { page: 0, size: 100 } },
      );
      if (result?.success && result.data) {
        return {
          entryItems: result.data.checklistQueries.entryItems ?? EMPTY_PAGE,
        };
      }
      return { entryItems: EMPTY_PAGE };
    } catch (error) {
      console.error("Failed to fetch checklist entry items:", error);
      return { entryItems: EMPTY_PAGE };
    }
  },
});

/**
 * Loads every checklist item for the add-items picker.
 */
defineLoader({
  pattern: "entry/:id/picker",
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
 * Loads the gallery items attached to an entry: resolves the entry's remote
 * object ids, then batch-fetches the Cerberus GalleryItems.
 */
defineLoader({
  pattern: "entry/:id/gallery",
  async loader(params) {
    const id = params.id as string;
    if (!id) return null;
    try {
      const detailsResult =
        await executeDocument<LocateChecklistEntryDetailsQuery>(
          LocateChecklistEntryDetailsDocument,
          { id },
        );
      const ids = detailsResult?.success
        ? (detailsResult.data?.checklistQueries.entryDetails?.remoteObject ??
          [])
        : [];
      if (ids.length === 0) {
        return { galleryItems: [] };
      }
      const result = await executeDocument<LocateGalleryItemsQuery>(
        LocateGalleryItemsDocument,
        { ids },
      );
      return {
        galleryItems: result?.success
          ? (result.data?.galleryQueries.locateGalleryItems ?? [])
          : [],
      };
    } catch (error) {
      console.error("Failed to fetch entry gallery items:", error);
      return { galleryItems: [] };
    }
  },
});

/**
 * Creates a blank entry and returns it.
 */
defineMutation({
  path: "entry/create",
  async handler(body: { name?: string }) {
    const result = await executeDocument<CreateChecklistEntryMutation>(
      CreateChecklistEntryDocument,
      { name: body.name ?? null },
    );
    const response = result.data?.checklistMutations.createChecklist;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to create entry.");
    }
    return response;
  },
});

/**
 * Creates an entry seeded from a single template and returns it.
 */
defineMutation({
  path: "entry/createFromTemplate",
  async handler(body: { templateId: string; name?: string }) {
    const result = await executeDocument<CreateChecklistFromTemplateMutation>(
      CreateChecklistFromTemplateDocument,
      { templateId: body.templateId, name: body.name ?? null },
    );
    const response =
      result.data?.checklistMutations.createChecklistFromTemplate;
    if (response == null) {
      throw new MutationError(
        result.error ?? "Failed to create entry from template.",
      );
    }
    return response;
  },
});

/**
 * Composes an entry from multiple templates and returns it.
 */
defineMutation({
  path: "entry/createFromTemplates",
  async handler(body: { templateIds: string[]; name?: string }) {
    const result = await executeDocument<CreateChecklistFromTemplatesMutation>(
      CreateChecklistFromTemplatesDocument,
      { templateIds: body.templateIds, name: body.name ?? null },
    );
    const response =
      result.data?.checklistMutations.createChecklistFromTemplates;
    if (response == null) {
      throw new MutationError(
        result.error ?? "Failed to create entry from templates.",
      );
    }
    return response;
  },
});

/**
 * Adds an item to an entry and returns the updated entry.
 */
defineMutation({
  path: "entry/addItem",
  async handler(body: { entryId: string; itemId: string }) {
    const result = await executeDocument<AddChecklistItemMutation>(
      AddChecklistItemDocument,
      {
        entryId: body.entryId,
        itemId: body.itemId,
        position: null,
      },
    );
    const response = result.data?.checklistMutations.addItem;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to add item.");
    }
    return response;
  },
});

/**
 * Removes an item from an entry and returns the updated entry.
 */
defineMutation({
  path: "entry/removeItem",
  async handler(body: { entryId: string; itemId: string }) {
    const result = await executeDocument<RemoveChecklistItemMutation>(
      RemoveChecklistItemDocument,
      { entryId: body.entryId, itemId: body.itemId },
    );
    const response = result.data?.checklistMutations.removeItem;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to remove item.");
    }
    return response;
  },
});

/**
 * Sets an item's status within an entry and returns the updated entry.
 */
defineMutation({
  path: "entry/setItemStatus",
  async handler(body: {
    entryId: string;
    itemId: string;
    status: ItemStatus;
  }) {
    const result = await executeDocument<SetChecklistItemStatusMutation>(
      SetChecklistItemStatusDocument,
      {
        entryId: body.entryId,
        itemId: body.itemId,
        status: body.status,
      },
    );
    const response = result.data?.checklistMutations.setItemStatus;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to set item status.");
    }
    return response;
  },
});

/**
 * Marks an entry complete and returns the updated entry.
 */
defineMutation({
  path: "entry/completeChecklist",
  async handler(body: { entryId: string }) {
    const result = await executeDocument<CompleteChecklistMutation>(
      CompleteChecklistDocument,
      { id: body.entryId },
    );
    const response = result.data?.checklistMutations.completeChecklist;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to complete checklist.");
    }
    return response;
  },
});

/**
 * Archives an entry and returns it.
 */
defineMutation({
  path: "entry/archiveChecklist",
  async handler(body: { entryId: string }) {
    const result = await executeDocument<ArchiveChecklistMutation>(
      ArchiveChecklistDocument,
      { id: body.entryId },
    );
    const response = result.data?.checklistMutations.archiveChecklist;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to archive checklist.");
    }
    return response;
  },
});

/**
 * Permanently deletes an entry and returns its id.
 */
defineMutation({
  path: "entry/delete",
  async handler(body: { entryId: string }) {
    const result = await executeDocument<DeleteChecklistMutation>(
      DeleteChecklistDocument,
      { id: body.entryId },
    );
    const response = result.data?.checklistMutations.deleteChecklist;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to delete checklist.");
    }
    return response;
  },
});

/**
 * Renames an entry and returns it.
 */
defineMutation({
  path: "entry/save",
  async handler(body: { id: string; name: string }) {
    const result = await executeDocument<SaveChecklistEntryMutation>(
      SaveChecklistEntryDocument,
      { input: { id: body.id, name: body.name } },
    );
    const response = result.data?.checklistMutations.saveChecklist;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to save checklist.");
    }
    return response;
  },
});

/**
 * Returns a presigned PUT URL for direct browser-to-storage upload.
 */
defineMutation({
  path: "filestore/get-presigned-upload-url",
  async handler(body: {
    bucket: string;
    key: string;
    contentType?: string;
  }) {
    const result = await executeDocument<GetPresignedUploadUrlMutation>(
      GetPresignedUploadUrlDocument,
      {
        input: {
          bucket: body.bucket,
          key: body.key,
          contentType: body.contentType,
        },
      },
    );
    const response = result.data?.filestoreMutations.getPresignedUploadUrl;
    if (response == null) {
      throw new MutationError(
        result.error ?? "Failed to get presigned upload URL.",
      );
    }
    return response;
  },
});

/**
 * Creates a gallery item (image wrapper) for an entry.
 */
defineMutation({
  path: "gallery/create",
  async handler(body: {
    title: string;
    imagePath: string;
    description?: string;
  }) {
    const result = await executeDocument<CreateGalleryItemMutation>(
      CreateGalleryItemDocument,
      {
        input: {
          title: body.title,
          imagePath: body.imagePath,
          description: body.description ?? null,
        },
      },
    );
    const response = result.data?.galleryMutations.create;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to create gallery item.");
    }
    return response;
  },
});

/**
 * Attaches a remote object to a checklist detail.
 */
defineMutation({
  path: "checklist/attachObject",
  async handler(body: {
    source: string;
    target: string;
    ownerType?: RemoteObjectType;
  }) {
    const result = await executeDocument<AttachChecklistObjectMutation>(
      AttachChecklistObjectDocument,
      {
        source: body.source,
        target: body.target,
        ownerType: body.ownerType ?? null,
      },
    );
    const response = result.data?.checklistMutations.attachObject;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to attach object.");
    }
    return response;
  },
});

/**
 * Detaches a remote object from a checklist detail.
 */
defineMutation({
  path: "checklist/detachObject",
  async handler(body: {
    source: string;
    target: string;
    ownerType?: RemoteObjectType;
  }) {
    const result = await executeDocument<DetachChecklistObjectMutation>(
      DetachChecklistObjectDocument,
      {
        source: body.source,
        target: body.target,
        ownerType: body.ownerType ?? null,
      },
    );
    const response = result.data?.checklistMutations.detachObject;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to detach object.");
    }
    return response;
  },
});

/**
 * Deletes a file from a bucket.
 */
defineMutation({
  path: "filestore/deleteFile",
  async handler(body: { bucket: string; key: string }) {
    const result = await executeDocument<DeleteFileMutation>(
      DeleteFileDocument,
      { input: { bucket: body.bucket, key: body.key } },
    );
    const response = result.data?.filestoreMutations.deleteFile;
    if (response == null) {
      throw new MutationError(result.error ?? "Failed to delete file.");
    }
    return response;
  },
});
