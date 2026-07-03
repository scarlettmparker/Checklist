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
  LocateChecklistEntryQuery,
} from "~/generated/graphql";
import {
  fetchListChecklistEntryItems,
  fetchListChecklistItems,
  fetchLocateChecklistEntry,
  mutateAddChecklistItem,
  mutateArchiveChecklist,
  mutateCompleteChecklist,
  mutateRemoveChecklistItem,
  mutateSetChecklistItemStatus,
} from "~/utils/api";
import EntryHeader from "~/components/entry/entry-header";
import EntryItems from "~/components/entry/entry-items";
import ChecklistItemsPrefetch from "~/components/entry/checklist-items-prefetch";
import styles from "./entry-checklist-page.module.css";

const PAGE = "entry/:id";

const EntryChecklistPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <Breadcrumb />
      <Suspense fallback={<Skeleton className={styles.sk} />}>
        <EntryHeader id={id} />
      </Suspense>
      <Suspense fallback={<Skeleton className={styles.sk} />}>
        <EntryItems id={id} />
      </Suspense>
      <Suspense fallback={null}>
        <ChecklistItemsPrefetch id={id} pattern={PAGE} />
      </Suspense>
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
    const result = await fetchListChecklistEntryItems(id, { page: 0, size: 100 });
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
 * Loads all checklist items for the add-items picker.
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
}

export default EntryChecklistPage;
