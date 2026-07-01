import { Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  invalidatePageData,
  makeCacheKey,
  MutationResult,
  mutationRegistry,
  pageDataRegistry,
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
  mutateRemoveChecklistItem,
  mutateSetChecklistItemStatus,
} from "~/utils/api";
import EntryHeader from "~/components/entry-header";
import EntryItems from "~/components/entry-items";
import ChecklistItemsPrefetch from "~/components/checklist-items-prefetch";
import styles from "./entry-checklist-page.module.css";

const PAGE = "entry/:id";

const EntryChecklistPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <Breadcrumb>
        <Suspense fallback={<Skeleton className={styles.sk} />}>
          <EntryHeader id={id} />
        </Suspense>
        <Suspense fallback={<Skeleton className={styles.sk} />}>
          <EntryItems id={id} />
        </Suspense>
        <Suspense fallback={null}>
          <ChecklistItemsPrefetch id={id} pattern={PAGE} />
        </Suspense>
      </Breadcrumb>
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
 * Server-side data fetcher for the entry's items.
 */
async function getEntryItemsData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistEntryItems(id);
    if (result?.success && result.data) {
      const items = (result.data as ListChecklistEntryItemsQuery)
        .checklistQueries.entryItems;
      return { entryItems: items ?? [] };
    }
    return { entryItems: [] };
  } catch (error) {
    console.error("Failed to fetch checklist entry items:", error);
    return { entryItems: [] };
  }
}

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
      if (items) {
        return { checklistItems: items };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist items for picker:", error);
    return null;
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
}

export default EntryChecklistPage;
