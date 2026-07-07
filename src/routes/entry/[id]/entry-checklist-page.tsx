import { Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  invalidatePageData,
  makeCacheKey,
  MutationResult,
  mutationRegistry,
  pageDataRegistry,
  ServerRedirectError,
} from "@sun/ssr";
import { Breadcrumb, Skeleton } from "@sun/components";
import {
  ItemStatus,
  ListChecklistEntryItemsQuery,
  ListChecklistItemsQuery,
  LocateChecklistEntryDetailsQuery,
  LocateChecklistEntryQuery,
} from "~/generated/graphql";
import {
  fetchCreateGalleryItem,
  fetchListChecklistEntryItems,
  fetchListChecklistItems,
  fetchLocateChecklistEntry,
  fetchLocateChecklistEntryDetails,
  fetchLocateGalleryItems,
  fetchPresignedUploadUrl,
  mutateAddChecklistItem,
  mutateArchiveChecklist,
  mutateAttachChecklistObject,
  mutateCompleteChecklist,
  mutateDeleteChecklist,
  mutateRemoveChecklistItem,
  mutateSaveChecklistEntry,
  mutateSetChecklistItemStatus,
} from "~/utils/api";
import EntryHeader from "~/components/entry/entry-header";
import EntryItems from "~/components/entry/entry-items";
import ChecklistItemsPrefetch from "~/components/entry/checklist-items-prefetch";
import EntryGallery from "~/components/entry/entry-gallery";
import { EntryChecklistPageSkeleton } from "~/components/entry/skeletons";
import styles from "./entry-checklist-page.module.css";

const PAGE = "entry/:id";

const EntryChecklistPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.columns}>
        <div className={styles.left_column}>
          <Breadcrumb />
          <Suspense fallback={<EntryChecklistPageSkeleton />}>
            <EntryHeader id={id} />
            <EntryItems id={id} />
          </Suspense>
          <Suspense fallback={null}>
            <ChecklistItemsPrefetch id={id} pattern={PAGE} />
          </Suspense>
        </div>
        <div className={styles.right_column}>
          <Suspense
            fallback={<Skeleton style={{ width: "100%", height: "12rem" }} />}
          >
            <EntryGallery entryId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

/**
 * Server-side data fetcher for the located entry.
 */
async function getEntryData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchLocateChecklistEntry(id);
    if (result?.success && result.data) {
      const entry = (result.data as LocateChecklistEntryQuery).checklistQueries
        .entry;
      if (entry) {
        return { entry };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist entry:", error);
    return null;
  }
}

/**
 * Default used when an entry has no items or the fetch fails (non-null sentinel
 * so the page doesn't crash on read).
 */
const EMPTY_ENTRY_ITEMS = {
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
 * Server-side data fetcher for the entry's items.
 */
async function getEntryItemsData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistEntryItems(id, {
      page: 0,
      size: 100,
    });
    if (result?.success && result.data) {
      const entryItems = (result.data as ListChecklistEntryItemsQuery)
        .checklistQueries.entryItems;
      return { entryItems: entryItems ?? EMPTY_ENTRY_ITEMS };
    }
    return { entryItems: EMPTY_ENTRY_ITEMS };
  } catch (error) {
    console.error("Failed to fetch checklist entry items:", error);
    return { entryItems: EMPTY_ENTRY_ITEMS };
  }
}

/**
 * Default used when no items are returned (non-null sentinel so the prefetched
 * picker key never throws "No data returned").
 */
const EMPTY_CHECKLIST_ITEMS = {
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
 * Loads every checklist item for the add-items picker. The picker paginates
 * client-side so page switches never trigger a client RPC.
 */
async function getChecklistItemsForPicker(): Promise<Record<
  string,
  unknown
> | null> {
  try {
    const result = await fetchListChecklistItems();
    if (result?.success && result.data) {
      const items = (result.data as ListChecklistItemsQuery).checklistQueries
        .items;
      return { checklistItems: items ?? EMPTY_CHECKLIST_ITEMS };
    }
    return { checklistItems: EMPTY_CHECKLIST_ITEMS };
  } catch (error) {
    console.error("Failed to fetch checklist items for picker:", error);
    return { checklistItems: EMPTY_CHECKLIST_ITEMS };
  }
}

/**
 * Loads the gallery items attached to an entry: fetches the entry detail
 * (remoteObject ids), then batch-resolves them to Cerberus GalleryItems.
 */
async function getEntryGalleryData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const detailsResult = await fetchLocateChecklistEntryDetails(id);
    const detail = detailsResult?.success
      ? (detailsResult.data as LocateChecklistEntryDetailsQuery | undefined)
          ?.checklistQueries.entryDetails
      : undefined;
    const ids = detail?.remoteObject ?? [];
    if (ids.length === 0) {
      return { galleryItems: [] };
    }
    const result = await fetchLocateGalleryItems(ids);
    const galleryItems = result?.success
      ? ((
          result.data as { galleryQueries?: { locateGalleryItems?: unknown[] } }
        )?.galleryQueries?.locateGalleryItems ?? [])
      : [];
    return { galleryItems };
  } catch (error) {
    console.error("Failed to fetch entry gallery items:", error);
    return { galleryItems: [] };
  }
}

/**
 * Register the data loaders and item mutation handlers for this page.
 */
export function registerEntryDataAndMutations(): void {
  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getEntryData(id);
  });

  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getEntryItemsData(id);
  });

  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getChecklistItemsForPicker();
  });

  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getEntryGalleryData(id);
  });

  mutationRegistry.registerMutationHandler("entry/addItem", async (body) => {
    const entryId = body?.entryId as string;
    const itemId = body?.itemId as string;
    const result = await mutateAddChecklistItem(entryId, itemId);
    invalidatePageData([makeCacheKey("entry/:id:entryItems", { id: entryId })]);
    return {
      ...((result.data?.checklistMutations.addItem as MutationResult) ?? {
        __typename: "StandardError",
        message: result.error || "Failed to add item.",
      }),
      invalidated: [makeCacheKey("entry/:id:entryItems", { id: entryId })],
    };
  });

  mutationRegistry.registerMutationHandler("entry/removeItem", async (body) => {
    const entryId = body?.entryId as string;
    const itemId = body?.itemId as string;
    const result = await mutateRemoveChecklistItem(entryId, itemId);
    invalidatePageData([makeCacheKey("entry/:id:entryItems", { id: entryId })]);
    return {
      ...((result.data?.checklistMutations.removeItem as MutationResult) ?? {
        __typename: "StandardError",
        message: result.error || "Failed to remove item.",
      }),
      invalidated: [makeCacheKey("entry/:id:entryItems", { id: entryId })],
    };
  });

  mutationRegistry.registerMutationHandler(
    "entry/setItemStatus",
    async (body) => {
      const entryId = body?.entryId as string;
      const itemId = body?.itemId as string;
      const status = body?.status as ItemStatus;
      const result = await mutateSetChecklistItemStatus(
        entryId,
        itemId,
        status,
      );
      invalidatePageData([
        makeCacheKey("entry/:id:entryItems", { id: entryId }),
      ]);
      return {
        ...((result.data?.checklistMutations
          .setItemStatus as MutationResult) ?? {
          __typename: "StandardError",
          message: result.error || "Failed to set item status.",
        }),
        invalidated: [makeCacheKey("entry/:id:entryItems", { id: entryId })],
      };
    },
  );

  mutationRegistry.registerMutationHandler(
    "entry/completeChecklist",
    async (body) => {
      const entryId = body?.entryId as string;
      const result = await mutateCompleteChecklist(entryId);
      invalidatePageData([makeCacheKey("entry/:id:entry", { id: entryId })]);
      return {
        ...((result.data?.checklistMutations
          .completeChecklist as MutationResult) ?? {
          __typename: "StandardError",
          message: result.error || "Failed to complete checklist.",
        }),
        invalidated: [makeCacheKey("entry/:id:entry", { id: entryId })],
      };
    },
  );

  mutationRegistry.registerMutationHandler(
    "entry/archiveChecklist",
    async (body) => {
      const entryId = body?.entryId as string;
      const result = await mutateArchiveChecklist(entryId);
      const data = result.data?.checklistMutations
        .archiveChecklist as MutationResult;

      if (data?.__typename === "QuerySuccess") {
        throw new ServerRedirectError("/", [
          makeCacheKey("entry:entry", {}),
          makeCacheKey("entry/:id:entry", { id: entryId }),
          makeCacheKey("entry/:id:entryItems", { id: entryId }),
        ]);
      }

      return {
        __typename: "StandardError",
        message: result.error || "Failed to archive checklist.",
      };
    },
  );

  mutationRegistry.registerMutationHandler("entry/delete", async (body) => {
    const entryId = body?.entryId as string;
    const result = await mutateDeleteChecklist(entryId);
    const data = result.data?.checklistMutations
      .deleteChecklist as MutationResult;

    if (data?.__typename === "QuerySuccess") {
      throw new ServerRedirectError("/", [makeCacheKey("entry:entry", {})]);
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to delete checklist.",
    };
  });

  mutationRegistry.registerMutationHandler("entry/save", async (body) => {
    const entryId = body?.id as string;
    const name = body?.name as string;
    const result = await mutateSaveChecklistEntry({ id: entryId, name });
    const data = result.data?.checklistMutations
      .saveChecklist as MutationResult;

    return {
      ...((data ?? {
        __typename: "StandardError",
        message: result.error || "Failed to save checklist.",
      }) as MutationResult),
      invalidated: [
        makeCacheKey("entry:entry", {}),
        makeCacheKey("entry/:id:entry", { id: entryId }),
      ],
    };
  });

  mutationRegistry.registerMutationHandler(
    "filestore/get-presigned-upload-url",
    async (body) => {
      const result = await fetchPresignedUploadUrl(
        body?.bucket as string,
        body?.key as string,
        body?.contentType as string | undefined,
      );
      const url = result?.success
        ? (
            result.data as {
              filestoreMutations?: { getPresignedUploadUrl?: string };
            }
          )?.filestoreMutations?.getPresignedUploadUrl
        : undefined;
      if (url) {
        return {
          __typename: "QuerySuccess" as const,
          id: url,
          message: "Presigned upload URL",
        };
      }
      return {
        __typename: "StandardError" as const,
        message: result?.error || "Failed to get presigned upload URL.",
      };
    },
  );

  mutationRegistry.registerMutationHandler("gallery/create", async (body) => {
    const result = await fetchCreateGalleryItem({
      title: body?.title as string,
      imagePath: body?.imagePath as string,
      description: (body?.description as string | undefined) ?? null,
    });
    const data = result.data?.galleryMutations?.create as MutationResult;
    return (
      data ?? {
        __typename: "StandardError",
        message: result.error || "Failed to create gallery item.",
      }
    );
  });

  mutationRegistry.registerMutationHandler(
    "checklist/attachObject",
    async (body) => {
      const source = body?.source as string;
      const target = body?.target as string;
      const ownerType = body?.ownerType as
        "ENTRY" | "TEMPLATE" | "ITEM" | undefined;
      const result = await mutateAttachChecklistObject(
        source,
        target,
        ownerType,
      );
      const data = result.data?.checklistMutations
        ?.attachObject as MutationResult;
      return {
        ...((data ?? {
          __typename: "StandardError",
          message: result.error || "Failed to attach object.",
        }) as MutationResult),
        invalidated: [
          makeCacheKey("entry/:id:galleryItems", { id: source }),
          makeCacheKey("entry/:id:entryDetails", { id: source }),
        ],
      };
    },
  );
}

export default EntryChecklistPage;
