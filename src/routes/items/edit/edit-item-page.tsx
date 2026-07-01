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
  ChecklistItemInput,
  LocateChecklistItemQuery,
} from "~/generated/graphql";
import { fetchLocateChecklistItem, mutateSaveChecklistItem } from "~/utils/api";
import { Skeleton } from "@sun/components";
import EditItemForm from "~/components/edit-item-form";
import styles from "./edit-item-page.module.css";

const PAGE = "items/:id/edit";

/**
 * Page for editing an existing checklist item.
 */
const EditItemPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.edit_item_form}>
      <Suspense fallback={<Skeleton style={{ width: "100%", height: "10rem" }} />}>
        <EditItemForm itemId={id} pattern={PAGE} />
      </Suspense>
    </div>
  );
};

/**
 * Server-side data fetcher for the item being edited.
 */
async function getItemData(
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
 * Handler for saving an existing checklist item.
 */
async function handleSaveItem(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const { id, name, description, categoryId, icon } = body;

  if (typeof name !== "string" || name.trim() === "") {
    return {
      __typename: "StandardError",
      message: "Name is required and must be a non-empty string.",
    };
  }

  const input: ChecklistItemInput = {
    id: id as string,
    name,
    description: (description as string) || "",
    categoryId: (categoryId as string) || null,
    icon: (icon as string) || null,
  };

  const result = await mutateSaveChecklistItem(input);
  const data = result.data?.checklistMutations.saveItem as MutationResult;

  if (data?.__typename === "QuerySuccess" || data?.__typename === "Redirect") {
    const itemId = id as string;
    throw new ServerRedirectError(
      `/items/${itemId}`,
      makeCacheKey("checklist:checklistItems", {}),
    );
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to save item.",
  };
}

/**
 * Register the data loader and mutation handler for this page.
 */
export function registerEditItemPageHandlers(): void {
  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getItemData(id);
  });

  mutationRegistry.registerMutationHandler("checklist/saveItem", handleSaveItem);
}

export default EditItemPage;
