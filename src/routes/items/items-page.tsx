import { Suspense } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pageDataRegistry } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { fetchListChecklistItems } from "~/utils/api";
import { Button } from "@sun/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import ItemList, { ItemListSkeleton } from "~/components/item-list";
import ItemDetailPlaceholder from "~/components/item-detail-placeholder";
import styles from "./items-page.module.css";

const ItemsPage = () => {
  const { t } = useTranslation("items");
  const outlet = useOutlet();
  const location = useLocation();
  const ICON_SIZE = 16;

  return (
    <div className={styles.items_layout}>
      <div className={styles.items_list_panel}>
        <Suspense fallback={<ItemListSkeleton />}>
          <ItemList pattern="checklist" />
        </Suspense>
      </div>
      <div className={styles.items_detail_panel}>
        {outlet ?? <ItemDetailPlaceholder />}
        <Link
          to={`/items/create?from=${encodeURIComponent(location.pathname)}`}
          className={styles.create_item_button}
        >
          <Button title={t("create-new-item-label")}>
            <PlusIcon
              className={styles.create_item_icon}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <p>{t("create-new-item-label")}</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

/**
 * Server-side data fetching function for checklist items.
 */
async function getChecklistItemsData(): Promise<Record<
  string,
  unknown
> | null> {
  try {
    const result = await fetchListChecklistItems();
    if (result?.data && result.success) {
      const checklistItems = (result.data as ListChecklistItemsQuery)
        .checklistQueries.items;
      if (checklistItems) {
        return { checklistItems: checklistItems };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist items:", error);
    return null;
  }
}

/**
 * Register the data loader for this page.
 */
export function registerChecklistItemsDataLoader(): void {
  pageDataRegistry.registerPageDataLoader("checklist", getChecklistItemsData);
}

export default ItemsPage;
