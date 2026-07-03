import { Suspense } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pageDataRegistry } from "@sun/ssr";
import { ListChecklistItemsQuery, PaginationInput } from "~/generated/graphql";
import { fetchListChecklistItems } from "~/utils/api";
import { Button } from "@sun/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import ItemList from "~/components/items/item-list";
import ItemDetailPlaceholder from "~/components/items/item-detail-placeholder";
import { ItemsPageSkeleton } from "~/components/items/skeletons";
import styles from "./items-page.module.css";

const ItemsPage = () => {
  const { t } = useTranslation("items");
  const outlet = useOutlet();
  const location = useLocation();
  const ICON_SIZE = 16;

  return (
    <Suspense fallback={<ItemsPageSkeleton />}>
      <div className={styles.items_layout}>
        <div className={styles.items_list_panel}>
          <ItemList pattern="checklist">
            <Link
              to={`/items/create?from=${encodeURIComponent(location.pathname)}`}
              className={styles.create_item_button}
            >
              <Button title={t("create-new-item-label")} variant="secondary">
                <PlusIcon
                  className={styles.create_item_icon}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
                <p>{t("create-new-item-label")}</p>
              </Button>
            </Link>
          </ItemList>
        </div>
        <div className={styles.items_detail_panel}>
          {outlet ?? <ItemDetailPlaceholder />}
        </div>
      </div>
    </Suspense>
  );
};

/**
 * Server-side data fetching function for checklist items.
 *
 * @param params page data params, carrying the 1-based `page` from the URL
 */
async function getChecklistItemsData(
  params?: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  try {
    // URL page is 1-based; the backend (Spring PageRequest) is 0-based.
    const pagination: PaginationInput = {
      page: Number(params?.page ?? 1) - 1,
    };
    const result = await fetchListChecklistItems(pagination);
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
