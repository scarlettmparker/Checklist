import { Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  makeCacheKey,
  MutationResult,
  mutationRegistry,
  pageDataRegistry,
  ServerRedirectError,
} from "@sun/ssr";
import {
  LocateChecklistItemQuery,
  LocateChecklistItemDetailsQuery,
} from "~/generated/graphql";
import {
  fetchLocateChecklistItem,
  fetchLocateChecklistItemDetails,
  mutateRetireChecklistItem,
} from "~/utils/api";
import ItemCard from "~/components/items/item-card";
import ItemDetailsCard from "~/components/items/item-details-card";
import { ItemDetailsPageSkeleton } from "~/components/items/skeletons";
import styles from "./item-details-page.module.css";

const PAGE = "checklist/:id";

/**
 * Item details page. Renders two independently-suspended cards: the core item
 * (locateChecklistItem) and its detail (locateChecklistItemDetails). Each is
 * wrapped in its own Suspense boundary with its own skeleton so they stream in
 * independently.
 */
const ItemDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.detail_layout}>
      <Suspense fallback={<ItemDetailsPageSkeleton />}>
        <ItemCard id={id} pattern={PAGE} />
        <ItemDetailsCard id={id} pattern={PAGE} />
      </Suspense>
    </div>
  );
};

/**
 * Server-side data fetcher for the core item.
 */
async function getChecklistItemData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchLocateChecklistItem(id);
    if (result?.success && result.data) {
      const item = (result.data as LocateChecklistItemQuery).checklistQueries
        .item;
      if (item) {
        return { item };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist item:", error);
    return null;
  }
}

/**
 * Default used when an item has no detail attached yet. Details are optional,
 * and getPageData treats a null data key as an error, so the loader always
 * returns a value here; the card renders a placeholder when ownerId is empty.
 */
const EMPTY_ITEM_DETAILS = {
  ownerId: null,
  description: null,
  remoteObject: [] as string[],
};

/**
 * Server-side data fetcher for the item detail.
 */
async function getChecklistItemDetailsData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchLocateChecklistItemDetails(id);
    if (result?.success && result.data) {
      const itemDetails = (result.data as LocateChecklistItemDetailsQuery)
        .checklistQueries.itemDetails;
      return { itemDetails: itemDetails ?? EMPTY_ITEM_DETAILS };
    }
    return { itemDetails: EMPTY_ITEM_DETAILS };
  } catch (error) {
    console.error("Failed to fetch checklist item details:", error);
    return { itemDetails: EMPTY_ITEM_DETAILS };
  }
}

/**
 * Register the data loaders for this page. Both are keyed under the same PAGE
 * pattern; getPageData reads them via separate keys ("item" / "itemDetails"),
 * so each suspends independently with its own skeleton.
 */
export function registerChecklistItemDetailsDataLoaders(): void {
  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getChecklistItemData(id);
  });
  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getChecklistItemDetailsData(id);
  });
}

/**
 * Handler for retiring (archiving) a checklist item; redirects to the items
 * list and invalidates every paginated list entry plus the item's detail.
 */
async function handleRetireItem(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const id = body?.id as string;
  const result = await mutateRetireChecklistItem(id);
  const data = result.data?.checklistMutations.retireItem as MutationResult;

  if (data?.__typename === "QuerySuccess" || data?.__typename === "Redirect") {
    throw new ServerRedirectError("/items", [
      makeCacheKey("checklist:checklistItems", { page: "*" }),
      makeCacheKey("checklist/:id:item", { id }),
    ]);
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to archive item.",
  };
}

/**
 * Register the retire-item mutation handler.
 */
export function registerRetireChecklistItemMutationHandler(): void {
  mutationRegistry.registerMutationHandler(
    "checklist/retireItem",
    handleRetireItem,
  );
}

export default ItemDetailsPage;
